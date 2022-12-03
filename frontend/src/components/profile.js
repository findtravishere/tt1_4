import React from "react";
import AuthService from "../services/auth";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome, {currentUser.email}</strong>
        </h3>
      </header>
      <p>
        <strong>JWT Token: </strong>
        {currentUser.Id}
      </p>
      <p>
        <strong>ID: </strong> {currentUser.Id}
      </p>
      <p>
        <strong>Email: </strong> {currentUser.Email}
      </p>
    </div>
  );
};

export default Profile;
