const express = require("express");
const router = express.Router();
const { UserModel } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

// * : login
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // db에 있는 유저인지 체크
  const userInDB = await UserModel.findOne({
    where: { username: username },
  });
  // db에 없으면
  if (!userInDB) {
    return res.json({ error: "user don't exist" });
  }
  // db에 있으면 비밀번호 일치 확인
  bcrypt.compare(password, userInDB.password).then((match) => {
    if (!match) {
      return res.json({ error: "wrong password" });
    }
    // 비밀번호까지 일치하면 token 생성해서 발행
    const accessToken = sign(
      //username과 id를 이용해서 생성함
      { username: userInDB.username, id: userInDB.id }, // userInfo
      "maruSecretKey" // secretKey
    );
    return res.json({
      username: userInDB.username,
      id: userInDB.id,
      accessToken: accessToken,
    });
  });
});

// * : create User
router.post("/create-user", async (req, res) => {
  const { username, password } = req.body;
  const userInDB = await UserModel.findOne({
    where: { username: username },
  });
  if (userInDB) {
    return res.json({ error: "username exist already" });
  }
  await bcrypt.hash(password, 10).then((hash) => {
    UserModel.create({ username: username, password: hash });
  });
  res.json("register success");
});

// * : validate User
router.get("/auth", validateToken, async (req, res) => {
  // validateToken 미들웨어에서 이미 검증을 했음, 에러나면 미들웨어 선에서 res보냄
  // 클라이언트로 req.user만 전달해주면 된다.
  res.json(req.user);
});

module.exports = router;
