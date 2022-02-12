// *: 라이브러리
import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
// * : 컴포넌트
import Header from "./components/Header";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
// * : 기타 등등
import { AuthContext } from "./helper/AuthContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  // user 로그인 상태 관리 state
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });

  useEffect(() => {
    // 렌더링 할 때 마다 서버로 accessToken 유효성 검사 맡김
    axios
      .get("http://localhost:3001/user-router/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // 유요한 토큰일 시에 authState를 설정
        if (!response.data.error) {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        } else {
          // 유효하지 않은 토큰일 시 authState 초기화
          console.log(response.data.error);
          setAuthState({ username: "", id: "", status: false });
        }
      });
  }, []);
  
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/post-detail/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
