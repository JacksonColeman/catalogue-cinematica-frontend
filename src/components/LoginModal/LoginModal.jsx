import React, { useState } from "react";
import "./LoginModal.css";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import SignupModal from "../SignupModal/SignupModal";

const LoginModal = ({ open, handleCloseModal }) => {
  if (!open) {
    return null;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [signUp, setSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          username,
          password,
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
        setPassword("");
      }
    } catch (error) {
      setErrors([error.message] || ["An error occurred"]); // Set a default error message
      console.error("An error occurred:", error);
    }
  };

  const handleSignUp = () => {
    setSignUp(true);
  };

  if (signUp) {
    console.log("moo");
    return <SignupModal open={true} handleCloseModal={handleCloseModal} />;
  }

  return (
    <div className="modal-component">
      <div className="overlay" onClick={handleCloseModal}></div>
      <div className="login-modal-container">
        <AiOutlineClose
          className="btn--close-modal"
          onClick={handleCloseModal}
        />
        {/* <button className="btn--close-modal" onClick={handleCloseModal}>
          x
        </button> */}
        <div>
          <h3 className="modal-header">Sign In</h3>

          <form className="modal-form">
            <label className="modal-label">
              <FaUser />
              <input
                className="modal-input"
                type="text"
                placeholder="Username"
                value={username}
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
            <div className="modal-error-container">
              {errors.map((error) => (
                <p className="error-message">{error}</p>
              ))}
            </div>
            <button
              type="button"
              className="modal-button-main"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </form>
          <p className="sign-up-prompt">
            Don't have an account?{" "}
            <p className="sign-up-link" onClick={handleSignUp}>
              Sign Up!
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
