// * : 라이브러리
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Button } from "react-bootstrap";
// * : 기타 등등
import { AuthContext } from "../helper/AuthContext";

function Login() {
  // * : state
  const { setAuthState } = useContext(AuthContext);
  // * : 기타 등등
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("write username"),
    password: Yup.string().min(4).required("write password"),
  });
  // * : 함수
  const navigate = useNavigate();
  // 로그인 클릭 시
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/user-router", data).then((response) => {
      // response.data에 error key값이 존재하면 에러가 발생한 것
      if (response.data.error) {
        alert("error");
      } else {
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/posts");
      }
    });
  };
  return (
    <div>
      <center>
        <Card style={{ width: "80%" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Card.Header>
                <Card.Title>Sign In</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Field
                    autoComplete="off"
                    id="username"
                    name="username"
                    placeholder="write username"
                    style={{ width: "30%" }}
                  />
                </Card.Text>
                <Card.Text>
                  <Field
                    autoComplete="off"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="write password"
                    style={{ width: "30%" }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <ErrorMessage name="username" component="div" />
                <ErrorMessage name="password" component="div" />
                <div>
                  Haven't you registered yet?{" "}
                  <Link to="/register">Register</Link>
                </div>
                <Button as="input" type="submit" value="Submit" />
              </Card.Footer>
            </Form>
          </Formik>
        </Card>
      </center>
    </div>
  );
}

export default Login;
