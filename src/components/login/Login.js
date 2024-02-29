import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../../Assets/images/H&T.png";
import { Link } from "react-router-dom";
import { AxiosConfig } from "../../Networking/AxiosConfig";
import { useDispatch, useSelector, connect } from "react-redux";
import { LOGIN_API_CALL, CLEAR_ERROR_MESSAGE } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const [error, setError] = useState("");

  console.log(props);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (props.users.status === 200) {
  //     navigate('/Customer')
  //   }
  // }, [props.users.status])

  const handleLogin = (e) => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    const usernameError = "Invalid username";
    const passwordError = "Invalid password";
    setError("");
    if (name.length === 0) {
      setError(usernameError);
      return;
    }
    if (password.length === 0) {
      setError(passwordError);
      return;
    }

    //API Call's
    const bodyData = {
      userName: name,
      password: password,
    };

    dispatch({ type: LOGIN_API_CALL, data: bodyData });
  };

  return (
    <Form>
      <div className="full-background">
        <Container fluid className="d-flex pt-5 justify-content-center ">
          <div className="border text-center w-40 h-40 p-5 pt-0 shadow rounded bg-light">
            <img
              src={Logo}
              alt=" HandT holidays company Logo"
              className="w-40 h-40"
            />
            <FloatingLabel
              id="floatingInput"
              label="Username"
              className="mb-2 "
            >
              <Form.Control
                id="validationCustom01"
                type="text"
                name="name"
                className="w-100 mb-2 rounded h-10 plain_text"
                placeholder="name@example.com"
                onChange={(e) => handleLogin(e)}
              />
              {error ? (
                <p style={{ color: "red" }}>Please enter a valid username</p>
              ) : null}
            </FloatingLabel>
            <FloatingLabel
              id="floatingPassword"
              label="Password"
              className="mb-3 rounded"
            >
              <Form.Control
                id="validationCustom02"
                type="password"
                name="password"
                className="w-100 rounded f-14 plain_text "
                placeholder="Password"
                onChange={(e) => handleLogin(e)}
              />
            </FloatingLabel>
            <Form.Check type="checkbox" className="rounded d-flex">
              <Form.Check.Input />
              <Form.Check className="ms-2 mb-2 f-14">Remember Me</Form.Check>
            </Form.Check>

            <div style={{color:"red"}}>
              {props.users.error && <p>{props.users.error}*</p>}
            </div>

            <Button
              variant=""
              className="m-2 mb-4 p-2 w-30 h-max txt-trans_up"
              style={{ backgroundColor: "#25316f", color: "white" }}
              type="button"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <p className="text-center mt-3 f-14">
              Don't Have an account?{" "}
              <span className="txt-trans_up">
                <Link to="/Signup">Register Here</Link>
              </span>
            </p>
          </div>
        </Container>
      </div>
    </Form>
  );
}

const mapToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapToProps)(Login);
