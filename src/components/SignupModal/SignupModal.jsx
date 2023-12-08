import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupModal.css";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaLock } from "@react-icons/all-files/fa/FaLock";

const SignupModal = ({ open, handleCloseModal }) => {
  if (!open) {
    return null;
  }

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // You can handle success as needed
        window.location.reload();
      } else {
        // Convert the errors array to a string
        console.log(data.errors);
        setErrors(data.errors); // Set the string in the state
        // Reset username and password fields on error
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
      }
    } catch (error) {
      setErrors([error.message] || ["An error occurred"]); // Set a default error message
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="modal-component">
      <div className="overlay" onClick={handleCloseModal}></div>
      <div className="signup-modal-container">
        <AiOutlineClose
          className="btn--close-modal"
          onClick={handleCloseModal}
        />
        <div>
          <h3 className="modal-header">Sign Up</h3>
          <form className="modal-form">
            <label className="modal-label">
              <FaUser />
              <input
                className="modal-input"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label className="modal-label">
              <FaLock />
              <input
                className="modal-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <label className="modal-label">
              <FaLock />
              <input
                className="modal-input"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </label>
            <br />
            <div className="modal-error-container">
              {errors.map((error) => (
                <p className="error-message">{error}</p>
              ))}
            </div>
            <button
              type="button"
              className="modal-button-main"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
