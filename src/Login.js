/* global grecaptcha */
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "./firebase";
import "./login.css";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TelegramLoginButton,
} from "react-social-login-buttons";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import OtpInput from "react-otp-input";
import { Height } from "@material-ui/icons";

let temp;

function Login() {
  const [loading, setloading] = useState(false);
  const [ShowPopup, setShowPopup] = useState(false);
  const [Number, setNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [ShowOTP, setShowOTP] = useState(false);
  const history = useHistory();
  const [error, seterror] = useState("");
  const GoogleSigninHandler = async () => {
    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      const response = await firebase.auth().signInWithPopup(provider);
      console.log(response);
      // history.push('/')
    } catch (error) {
      console.log(error);
    }
  };
  const FacebookSigninHandler = async () => {
    try {
      var provider = new firebase.auth.FacebookAuthProvider();
      const response = await firebase.auth().signInWithPopup(provider);
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const PhoneSigninHandler = () => {
    setShowPopup(true);
  };
  const OnSubmitHandler = async () => {
    setloading(true);
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      const phoneNumber = "+91" + Number;
      const appVerifier = window.recaptchaVerifier;
      temp = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      setShowOTP(true);
    } catch (error) {
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
        seterror(error.code);
      });
      console.log(error);
    }
    setloading(false);
  };
  const OnSubmitOTP = async () => {
    setloading(true);
    try {
      const response = await temp.confirm(OTP);
      setShowPopup(false);
      // history.push('/')
      console.log(response.user);
    } catch (error) {
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
        seterror(error.code);
      });
      console.log(error);
    }
    setloading(false);
  };
  return (
    <div>
      <div class="wrap">
        <div class="text-banner">Welcome to Incred Project</div>
      </div>
      <div class="wrap1">
        <FacebookLoginButton
          onClick={FacebookSigninHandler}
          size={"50px"}
          className={"socialbttn"}
        >
          <span>Login with Facebook</span>
        </FacebookLoginButton>
        <GoogleLoginButton
          onClick={GoogleSigninHandler}
          size={"50px"}
          className={"socialbttn"}
        >
          <span>Login with Google</span>
        </GoogleLoginButton>
        <TelegramLoginButton
          onClick={PhoneSigninHandler}
          size={"50px"}
          className={"socialbttn"}
        >
          <span>Login with Phone Number</span>
        </TelegramLoginButton>
      </div>
      {/* <button onClick={GoogleSigninHandler}>Signin with Google</button>
      <button onClick={FacebookSigninHandler}>Signin with Facebook</button>
      <button onClick={PhoneSigninHandler}>Signin with Phone</button> */}
      {ShowPopup && (
        <div>
          {!ShowOTP ? (
            <div>
              <input
                placeholder="Enter Phone No."
                value={Number}
                className="Input"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 10) {
                    setNumber(value);
                  }
                  seterror("");
                }}
              ></input>
              <Button
                variant="contained"
                color="primary"
                onClick={OnSubmitHandler}
                disabled={Number.length < 10 || loading}
                id="SubmitButton"
              >
                Submit
              </Button>
            </div>
          ) : (
            <div>
              {/* <input
                placeholder="OTP"
                value={OTP}
                onChange={(e) => {
                  const value = e.target.value;
                  setOTP(value);
                  seterror("");
                }}
              ></input> */}
              <OtpInput
                value={OTP}
                onChange={(value) => {
                  setOTP(value);
                  seterror("");
                }}
                numInputs={6}
                separator={
                  <span
                    style={{
                      margin: "5px",
                      //   height: "20px"
                    }}
                  >
                    {" "}
                  </span>
                }
                inputStyle="otp_in"
                containerStyle="otp"
              />
              <Button
                onClick={OnSubmitOTP}
                disabled={loading}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          )}
          <div id="recaptcha-container"></div>
          <p className="errorCode">{error}</p>
          <div>{loading && <CircularProgress />}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
