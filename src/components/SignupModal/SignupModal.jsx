import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupModal.css";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";

const SignupModal = ({ open, handleCloseModal }) => {
  if (!open) {
    return null;
  }

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [errors, setErrors] = useState([]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    validatePassword(newPassword);
    validatePasswordMatch(newPassword, passwordConfirmation);
  };

  const handlePasswordConfirmationChange = (newPasswordConfirmation) => {
    setPasswordConfirmation(newPasswordConfirmation);
    validatePasswordMatch(password, newPasswordConfirmation);
  };

  const validatePasswordMatch = (password1, password2) => {
    const doPasswordsMatch = password1 === password2 && password1.length > 0;
    setPasswordsMatch(doPasswordsMatch);
  };

  const validatePassword = (passwordToValidate) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(passwordToValidate);
    setValidPassword(isValid);
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleTogglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
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
            <div>
              <label className="modal-label">
                <FaLock />
                <input
                  className="modal-input"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <span
                  className="password-toggle"
                  onClick={handleTogglePasswordVisibility}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </label>
            </div>
            <label className="modal-label">
              <FaLock />
              <input
                className="modal-input"
                type={isPasswordConfirmVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) =>
                  handlePasswordConfirmationChange(e.target.value)
                }
              />
              <span
                className="password-toggle"
                onClick={handleTogglePasswordConfirmVisibility}
              >
                {isPasswordConfirmVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
            <p className={`password-info ${validPassword ? "valid" : ""}`}>
              {!validPassword
                ? "Password must be at least 8 characters long and must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
                : "Valid password!"}
            </p>

            <p className={`password-info ${passwordsMatch ? "valid" : ""}`}>
              {!passwordsMatch ? "Passwords must match." : "Passwords match!"}
            </p>
            <ul className="modal-error-container">
              {errors.map((error) => (
                <li className="error-message">{error}</li>
              ))}
            </ul>
            <button
              type="button"
              className="modal-button-main"
              onClick={handleSignUp}
              disabled={!validPassword || !passwordsMatch}
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
