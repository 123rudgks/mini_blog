const express = require("express");
const router = express.Router();
const { PostModel } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


// * : 포스트들 불러오기
router.get("/", async (req, res) => {
  const posts = await PostModel.findAll();
  res.json(posts);
});

// * : 새 포스트 생성
router.post("/", validateToken, async (req, res) => {
  const newPost = req.body;
  await PostModel.create(newPost);
  res.json("new post has created");
});

// * : post 상세 페이지로
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findByPk(id);
  res.json(post);
});

// * : post 삭제
router.delete("/delete/:postId", async(req,res)=>{
  const postId = req.params.postId;
  await PostModel.destroy({where: {
    id: postId,
  }});
  res.json("Deleted Successful");
})

module.exports = router;
