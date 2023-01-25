import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";

import "./index.css";
import { AuthContext } from "../../../contexts/AuthContext";

const SignIn = (props) => {
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);

  const signInWithGoogle = async () => {
    await logIn("google");
    navigate("/");
  };
  const signInWithFacebook = async () => {
    await logIn("facebook");
    navigate("/");
  };
  const signInWithApple = async () => {
    await logIn("apple");
    navigate("/");
  };

  return (
    <div className="sign-in">
      <div className="sign-in-wrapper">
        <h1>Sign In</h1>
        <div className="sign-in-container">
          <div className="sign-in-error-wrapper">
            <p className="error-msg"></p>
          </div>
          <div className="sign-in-buttons">
            <GoogleLoginButton onClick={signInWithGoogle}>
              Sign in with Google
            </GoogleLoginButton>
            <FacebookLoginButton onClick={signInWithFacebook}>
              Sign in with Facebook
            </FacebookLoginButton>
            <AppleLoginButton onClick={signInWithApple}>
              Sign in with Apple
            </AppleLoginButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
