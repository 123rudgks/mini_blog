const express = require("express");
const router = express.Router();
const {CommentModel} = require("../models");

// * : post불러오기
router.get("/:postId",async (req,res)=>{
  const postId = req.params.postId;
  const newComment = await CommentModel.findAll({where:{PostModelId: postId}});
  res.json(newComment);
});
// * : 댓글 추가
router.post("/add-comment",async (req,res)=>{
  const newComment = await CommentModel.create(req.body);
  res.json(newComment);
});
// * : 댓글 삭제
router.delete("/delete-comment/:commentId", async(req,res)=>{
  const commentId = req.params.commentId;
  await CommentModel.destroy({where: {
    id: commentId,
  }});
  res.json("Deleted Successful");
})



module.exports = router;