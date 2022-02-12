// * : 라이브러리
import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Button } from "react-bootstrap";
// * : 기타 등등
import { AuthContext } from "../helper/AuthContext";
function NewPost() {
  // * : state
  const { authState } = useContext(AuthContext);
  // * : 기타 등등
  const initialValues = {
    title: "",
    context: "",
    author: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("write a title"),
  });
  // * : 함수
  const navigate = useNavigate();
  // submit버튼 클릭시 함수
  const onSubmit = (data) => {
    axios
      .post(
        "http://localhost:3001/post-router",
        { ...data, author: authState.username },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          navigate("/login");
          return;
        }

        navigate("/posts");
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
                <Card.Title>
                  <Field
                    autoComplete="off"
                    id="inputCreatePost"
                    name="title"
                    placeholder="title"
                    style={{ width: "100%" }}
                  />
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  <Field
                    autoComplete="off"
                    id="inputCreatePost"
                    value={authState.username}
                    name="author"
                    placeholder="author"
                    style={{ width: "100%" }}
                  />
                </Card.Subtitle>
                <Card.Text>
                  <Field
                    autoComplete="off"
                    component="textarea"
                    id="inputCreatePost"
                    name="context"
                    placeholder="context"
                    rows="25"
                    style={{ width: "100%" }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button as="input" type="submit" value="Submit" />
              </Card.Footer>
            </Form>
          </Formik>
        </Card>
      </center>
    </div>
  );
}

export default NewPost;
