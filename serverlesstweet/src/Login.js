import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "./userpool";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passToggle, setPassToggle] = useState(false);


  const handleClick = () => {
    navigate("/signup");
  };

  const toggleBtn = () => {
    setPassToggle((prevState) => !prevState);
  };

  const user = new CognitoUser({
    Username: email,
    Pool: userpool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const loginUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(email, password);
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log(data);
        setLoading(false);
        navigate("/home");
        localStorage.setItem("usertoken", data.getAccessToken().getJwtToken());
        localStorage.setItem("refreshToken", data.getIdToken().getJwtToken());
        localStorage.setItem("idToken", data.getRefreshToken().getToken());
        user.getUserAttributes(function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          for (let i = 0; i < result.length; i++) {
            localStorage.setItem("userId", result[0].getValue());
            localStorage.setItem("userName", result[2].getValue());
          }
        });
        toast.success("You have signed up successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        // return (
        //     <Alert severity="success">This is a success alert — check it out!</Alert>)
      },
      onFailure: (err) => {
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("onFailure", err);
        return {
          statusCode: 400,
          response: err.message || JSON.stringify(err),
        };
      },
    });
  };
  return (
    <div
      className="contain"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        backgroundColor: "rgb(250,251,251)",
      }}
    >
      <div className="loginCard" >
        <form onSubmit={loginUser}>
          <h4 style={{ marginBottom: "10px", textAlign: 'center' }}>Welcome to Serverless Tweets</h4>
          <p>
            New to Serverless Tweet?{" "}
            <b
              style={{ color: "#363062", cursor: "pointer" }}
              onClick={handleClick}
            >
              Create an account
            </b>{" "}
          </p>
          <div className="email">
            <label>Email</label>
            <div className="d-flex">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
            <span
                
                style={{
                  marginLeft: "-2.17rem",
                  marginTop: "0.7rem",
                  cursor: "pointer",
                  outline: "none !",
                  color: '#363062',
                  fontSize: '18px'
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="password ">
            <label>Password</label>
            <div className="d-flex">
            <input
                    placeholder="Enter password"
                    name="password"
                    type={passToggle ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{backgroundColor: 'transparent'}}
                  />
              <span
                onClick={toggleBtn}
                style={{
                  marginLeft: "-2.17rem",
                  marginTop: "0.7rem",
                  cursor: "pointer",
                  outline: "none !",
                  color: '#363062',
                  fontSize: '18px'
                }}
              >
                {passToggle ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
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
              <button type="submit"> Login</button>
            </div>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
