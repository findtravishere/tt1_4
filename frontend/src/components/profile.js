import React, { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth";
import Button from "react-bootstrap/Button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const { id } = useParams();
  const form = useRef();

  const initialCurrentState = {
    id: null,
    email: "",
    address: "",
  };

  const [currentProfile, setCurrentProfile] = useState(initialCurrentState);
  const [submitted, setSubmitted] = useState(false);

  const getUserProfile = (id) => {
    UserService.update(id)
      .then((response) => {
        setCurrentProfile(response.data);
        console.log(response.data, "update");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserProfile(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProfile({ ...currentProfile, [name]: value });
  };

  const updateProfile = () => {
    UserService.update(currentProfile.id, currentProfile)
      .then((response) => {
        console.log(response.data, "update");
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUpdatedProfile = () => {
    updateProfile();
    setSubmitted(false);
  };

  return (
    <div>
      {currentProfile && submitted ? (
        <div>
          <h4>The profile was updated successfully!</h4>
          <Link to={`/savings/`}>
            <Button>Back to Home</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Form>
            <header className="jumbotron">
              <h3>
                <strong>Welcome, {currentUser.Name}</strong>
              </h3>
            </header>

            <div className="mb-3">
              <label>Token:</label>
              <strong className="form-control">{currentUser.Token}</strong>
            </div>

            <div className="mb-3">
              <label>Id:</label>
              <strong className="form-control"> {currentUser.Id}</strong>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={currentProfile.Email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                className="form-control"
                name="text"
                value={currentProfile.Address}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" onClick={newUpdatedProfile}>
              Update Profile
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Profile;
