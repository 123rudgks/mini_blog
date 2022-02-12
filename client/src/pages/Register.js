// * : 라이브러리
import React from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Button } from "react-bootstrap";

function Register() {
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
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/user-router/create-user",data).then((response)=>{
      // response.data에 error key값이 존재하면 에러가 발생한 것
      if(response.data.error){
        alert(response.data.error)
      }else{
        alert("registration successful")
        navigate("/login");
      }
    })
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
                <Card.Title>Sign Up</Card.Title>
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
                <div>Do you have ID already? <Link to="/login">Sign In</Link></div>
                <Button as="input" type="submit" value="Submit" />
              </Card.Footer>
            </Form>
          </Formik>
        </Card>
      </center>
    </div>
  );
}

export default Register;
