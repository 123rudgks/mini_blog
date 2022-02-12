// * : 라이브러리
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card } from "react-bootstrap";
// * : 기타 등등
import { AuthContext } from "../helper/AuthContext";

function PostDetail() {
  // * : states
  // 클릭한 post 정보를 담은 state
  const [postObject, setPostObject] = useState({});
  // 해당 post에 딸린 comments
  const [commentArray, setCommentArray] = useState([]);
  // comment input onchange 관리 state
  const [commentText, setCommentText] = useState("");
  const { authState } = useContext(AuthContext);
  // url의 parameter를 자동으로 추출해줌
  let { id } = useParams();

  // * : 함수
  const navigate = useNavigate();
  // 게시글 삭제 버튼 클릭 시 함수
  const onDeletePost = async () => {
    if (window.confirm("will you delete your post?")) {
      await axios
        .delete(`http://localhost:3001/post-router//delete/${id}`)
        .then((response) => {
          alert(response.data);
          navigate("/posts");
        });
    }
  };
  // 댓글 생성 버튼 클릭시 함수
  const addComment = async () => {
    if (!authState.status) {
      alert("you should log in to write a comment");
      return;
    }
    // 댓글 작성 유무 체크
    if (commentText.length === 0) {
      alert("write a comment");
      return;
    }
    await axios
      .post(`http://localhost:3001/comment-router/add-comment`, {
        context: commentText,
        username: authState.username,
        PostModelId: id,
      })
      .then((response) => {
        // 새로 생성한 comment 추가해서 re-rendering
        setCommentArray([...commentArray, response.data]);
        setCommentText("");
      });
  };

  // 댓글 삭제 버튼 클릭 시 함수
  const deleteComment = (commentId) => {
    axios
      .delete(
        `http://localhost:3001/comment-router/delete-comment/${commentId}`
      )
      .then((response) => {
        // "deleted Successful"
        alert(response.data);
        // 삭제된 comment 제외하고 다시 화면에 뿌려줌
        const commentsAfterDelete = commentArray.filter((comment) => {
          return comment.id !== commentId;
        });
        setCommentArray(commentsAfterDelete);
      });
  };

  useEffect(() => {
    // 해당 post에 대한 정보 불러오기
    axios
      .get(`http://localhost:3001/post-router/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });
    // 해당 post에 딸린 comment 불러오기
    axios.get(`http://localhost:3001/comment-router/${id}`).then((response) => {
      setCommentArray(response.data);
    });
  }, []);
  return (
    <div>
      <center>
        <Card style={{ width: "80%" }}>
          <Card.Header>
            <Card.Title>{postObject.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              {postObject.author}
            </Card.Subtitle>
            <Card.Text>{postObject.context}</Card.Text>
            {authState.username === postObject.author && (
              <button onClick={onDeletePost}>delete post</button>
            )}
          </Card.Body>
          <Card.Footer>
            <div>
              댓글:
              <input
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                }}
              />
            </div>
            <button onClick={addComment}>+</button>
            {commentArray.map((comment) => {
              return (
                <div key={comment.id}>
                  {comment.username} : {comment.context}{" "}
                  {/* 자신이 쓴 댓글에만 삭제 버튼 보이게 처리 */}
                  {authState.username === comment.username && (
                    <button onClick={() => deleteComment(comment.id)}>x</button>
                  )}
                </div>
              );
            })}
          </Card.Footer>
        </Card>
      </center>
    </div>
  );
}

export default PostDetail;
