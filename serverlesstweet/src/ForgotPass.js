import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "./userpool";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { ToastContainer } from "react-toastify";
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [code, setCode] = useState("");
  const [passToggle, setPassToggle] = useState(false);


  const toggleBtn = () => {
    setPassToggle((prevState) => !prevState);
  };

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userpool,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (password == confirmPassword) {
      cognitoUser.confirmPassword(code, password, {
        onSuccess: function (data) {
          console.log("CodeDeliveryData from forgotPassword: " + data);
          toast.success("Password Reset Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/");
          setEmail('')
          setConfirmPassword('')
          setPassword('')
        },
        onFailure: function (err) {
          toast.error('Invalid verification code', {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          setEmail('')
          setConfirmPassword('')
          setPassword('')
        },
      });
    } else {
      toast.error("Password does not match", {
        position: toast.POSITION.TOP_CENTER,
      });
          setLoading(false)
          setEmail('')
          setConfirmPassword('')
          setPassword('')
    }
  };

  const sendCode = (event) => {
    setLoading(true);
    event.preventDefault();
    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        // successfully initiated reset password request
        console.log("CodeDeliveryData from forgotPassword: " + data);
      },
      onFailure: function (err) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        setEmail("");
      },
      //Optional automatic callback
      inputVerificationCode: function (data) {
        console.log("Code sent to: " + data);
        setLoading(false);
        setStage(2);

        // var verificationCode = document.getElementById('code').value;
        // var newPassword = password;
        // cognitoUser.confirmPassword(verificationCode, newPassword, {
        //     onSuccess() {
        //         setLoading(false)
        //         setStage(2)
        //         console.log('Password confirmed!');
        //     },
        //     onFailure(err) {
        //         console.log('Password not confirmed!');
        //     },
        // });
      },
    });
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
      <div className="signupCard" style={{ position: "relative" }}>
        <i>
          <p
            className="reset"
            style={{
              color: "#949393",
              cursor: "pointer",
              fontSize: "14px",
              position: "absolute",
              bottom: 5,
              right: 20,
            }}
            onClick={() => navigate("/")}
          >
            {"Return to Login"}
          </p>
        </i>
        {stage === 1 ? (
          <form onSubmit={sendCode}>
            <h4 style={{ textAlign: "center" }}>Reset Password</h4>
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
                  color: '#363062',
                  fontSize: '18px'
                }}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <p style={{ textAlign: "center" }}>
              A verification code will be sent to your <br></br>email to reset
              your password
            </p>
            {loading ? (
              <div className="loadingButton">
                <button type="submit">
                  <CircularProgress style={{ width: "30px", color: "#fff" }} />
                </button>
              </div>
            ) : (
              <div className="resetButton">
                <button type="submit"> Send Verification Code</button>
              </div>
            )}
          </form>
        ) : (
          <div>
            <form onSubmit={onSubmit}>
              <h4 style={{ textAlign: "center" }}>Reset Password</h4>
              <div className="email">
                <label>Verification Code</label>
                <input
                  placeholder="Enter your verification code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                ></input>
              </div>
              <div className="password ">
                <label>New Password</label>
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
                <label>Confirm Password</label>
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
                    <CircularProgress
                      style={{ width: "30px", color: "#fff" }}
                    />
                  </button>
                </div>
              ) : (
                <div className="loginButton">
                  <button type="submit"> Reset Password</button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
