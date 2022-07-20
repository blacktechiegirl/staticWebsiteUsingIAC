import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "./userpool";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";


const SignUp = () => {
  const attributeList = [];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [passToggle, setPassToggle] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleBtn = () => {
    setPassToggle((prevState) => !prevState);
  };

  var dataUsername = {
    Name: "name",
    Value: username,
  };

  var attributeUsername = new CognitoUserAttribute(dataUsername);
  attributeList.push(attributeUsername);
  console.log(attributeList);

  const onSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if (password === confirmPassword) {
      userpool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log(err);
          setLoading(false);
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setEmail('')
          setConfirmPassword("");
          setPassword("");
          
        } else {
          console.log(result);
          toast.success("You have signed up successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          navigate("/");
        }
      });
    } else {
      toast.error("Password does not match", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      setConfirmPassword("");
      setPassword("");
    }
  };

  console.log(email, password);

  return (
    <div
      className="contain"
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(250,251,251)",
      }}
    >
        <ToastContainer />
      <div className="signup">
        <form onSubmit={onSubmit}>
          <h4 style={{ textAlign: "center" }}>Sign Up</h4>
          <div className="email">
            <label>UserName</label>
            <input
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></input>
            <span
              style={{
                marginLeft: "-2.17rem",
                marginTop: "0.7rem",
                cursor: "pointer",
                outline: "none !",
                color: "#363062",
                fontSize: "18px",
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <div className="email">
            <label>Email</label>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <span
              style={{
                marginLeft: "-2.17rem",
                marginTop: "0.7rem",
                cursor: "pointer",
                outline: "none !",
                color: "#363062",
                fontSize: "18px",
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
          <div className="password ">
            <label>Enter Password</label>
            <div className="d-flex">
              <input
                placeholder="Enter password"
                name="password"
                type={passToggle ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ backgroundColor: "transparent" }}
              />
              <span
                onClick={toggleBtn}
                style={{
                  marginLeft: "-2.17rem",
                  marginTop: "0.7rem",
                  cursor: "pointer",
                  outline: "none !",
                  color: "#363062",
                  fontSize: "18px",
                }}
              >
                {passToggle ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            </div>
          </div>
          <div className="password ">
            <label> Confirm Password</label>
            <div className="d-flex">
              <input
                placeholder="Enter password"
                name="password"
                type={passToggle ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                style={{ backgroundColor: "transparent" }}
              />
              <span
                onClick={toggleBtn}
                style={{
                  marginLeft: "-2.17rem",
                  marginTop: "0.7rem",
                  cursor: "pointer",
                  outline: "none !",
                  color: "#363062",
                  fontSize: "18px",
                }}
              >
                {passToggle ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            </div>
          </div>
          {loading ? (
            <div className="loadingButton">
              <button type="submit">
                <CircularProgress style={{ width: "30px", color: "#fff" }} />
              </button>
            </div>
          ) : (
            <div className="loginButton">
              <button type="submit"> SignUp</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
