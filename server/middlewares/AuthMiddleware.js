const {verify} = require('jsonwebtoken');
const validateToken = (req,res,next) => {
  // request의 header안에 accessToken을 담아서 보낸다.
  const accessToken = req.header("accessToken");
  if(accessToken==="null"){
    return res.json({error: "User not Logged In"});
  }
  try{
    // secretKey를 통해 전달받은 accessToken을 verify
    // accessToken을 해독하여 {username, id, token} 값을 전달 받음
    const validToken = verify(accessToken,"maruSecretKey");
    req.user = validToken;
    if(validToken){
      return next();
    }
  } catch(err){
    // verify 에서 에러 발생시 next로 넘어가지 않고 곧바로 res로 응답함
    return res.json({error: err});
  }
};

module.exports = {validateToken};