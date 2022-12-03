import React, { useState, useRef, useEffect } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import isEmail from "validator/lib/isEmail";

import AuthService from "../services/auth";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email
      </div>
    );
  }
};

const vUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 chars
      </div>
    );
  }
};

const vFirstName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The first name must be between 3 and 20 chars
      </div>
    );
  }
};

const vLastName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The last name must be between 3 and 20 chars
      </div>
    );
  }
};

const vAddress = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The addrss must be between 3 and 20 chars
      </div>
    );
  }
};

const vPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 chars
      </div>
    );
  }
};

const vConfirmpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 chars
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successful, setSuccessful] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    document.title = "Register";
  });

  const handleChange = () => {
    setChecked(!checked);
    console.log(checked);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setError("Password not match");
    } else {
      setError("");
    }
  };

  const togglePassword = (e) => {
    setShowPassword((showPassword) => !showPassword);
  };

  const toggleConfirmPassword = (e) => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        username,
        password,
        firstName,
        lastName,
        email,
        address,
        checked
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSuccessful(false);
          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vUsername]}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username">First Name </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={firstName}
                onChange={onChangeFirstName}
                validations={[required, vFirstName]}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username">Last Name </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={lastName}
                onChange={onChangeLastName}
                validations={[required, vLastName]}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username">Address </label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={onChangeAddress}
                validations={[required, vAddress]}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
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
                  validations={[required, vPassword]}
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

            <div className="mb-3">
              <label htmlFor="password">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => onChangeConfirmPassword(e)}
                  validations={[required, vConfirmpassword]}
                />
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={toggleConfirmPassword}
                >
                  Show Password
                </button>
              </div>

              {error && (
                <div className="mb-3">
                  <div
                    className={error ? "alert alert-danger" : ""}
                    role="alert"
                  >
                    {error}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                />
                Do you want to opt for physical statement?
              </label>

              <p>{checked.toString()}</p>
            </div>
            <div className="form-group">
              <button className="btn btn-dark btn-block">Sign Up</button>
            </div>
          </div>
        )}

        {message && (
          <div className="mb-3">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Register;
