import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const togglePassword = (e) => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      //   AuthService.login(username, password).then(
      //     () => {
      //       navigate("/profile");
      //       window.location.reload();
      //     },
      //     (error) => {
      //       const resMessage =
      //         (error.response &&
      //           error.response.data &&
      //           error.response.data.message) ||
      //         error.message ||
      //         error.toString();
      //       setLoading(false);
      //       setMessage(resMessage);
      //     }
      //   );
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="form-container">
      <h2>Login</h2>

      <Form onSubmit={handleLogin} ref={form}>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={togglePassword}
            >
              Show Password
            </button>
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-dark btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        <p style={{ textAlign: "center" }}>
          <a href="/">Click here to create account</a>
        </p>
      </Form>
    </div>
  );
};

export default Login;
