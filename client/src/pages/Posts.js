// * : 라이브러리
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";


function Posts() {
  // * : states
  // DB로 부터 받은 post 정보들의 리스트
  const [listOfPosts, setListOfPosts] = useState([]);
  // * : 함수
  const navigate = useNavigate();
  // create 버튼 클릭 시 new-post 페이지로 이동
  const navToNewPost = () => {
    if (localStorage.getItem("accessToken")) {
      navigate("/new-post");
    } else {
      alert("you should sign in to create new post");
    }
  };
  useEffect(() => {
    // re-render 마다 post 리스트 새로 갱신하기
    axios.get("http://localhost:3001/post-router").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        {listOfPosts.map((post, key) => {
          return (
            <div
              key={key}
              onClick={() => {
                navigate(`/post-detail/${post.id}`);
              }}
            >
              <Col>
                <Card>
                  <Card.Header>
                    <Card.Title>제목 : {post.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{post.context.substring(0, 20)}...</Card.Text>
                  </Card.Body>
                  <Card.Footer>작가 : {post.author}</Card.Footer>
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
      <center>
        <div className="writeBtn">
          <Button onClick={navToNewPost}>write</Button>
        </div>
      </center>
    </div>
  );
}

export default Posts;
