import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
  LoginSocialApple,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";

import "./index.css";
import { AuthContext } from "../../../contexts/AuthContext";

const SignIn = (props) => {
  const navigate = useNavigate();
  const { user, signIn } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  console.log(process.env);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleLoginSuccess = async ({ provider, data }) => {
    console.log(provider, data);
    await signIn(data, provider);
    navigate("/");
  };
  const handleLoginFailure = (err) => {
    console.log(err);
  };

  return (
    <div className="sign-in">
      <div className="sign-in-wrapper">
        <h1>Sign In</h1>
        <div className="sign-in-container">
          {errorMsg ? (
            <div className="sign-in-error-wrapper">
              <p className="error-msg">{errorMsg}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="sign-in-buttons">
            <LoginSocialGoogle
              client_id={process.env.REACT_APP_GG_APP_ID || ""}
              redirect_uri={process.env.SIGNIN_SUCCESS_REDIRECT_URI}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={handleLoginSuccess}
              onReject={handleLoginFailure}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
            <LoginSocialFacebook
              appId={process.env.REACT_APP_FB_APP_ID || ""}
              fieldsProfile={
                "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
              }
              redirect_uri={process.env.SIGNIN_SUCCESS_REDIRECT_URI}
              onResolve={handleLoginSuccess}
              onReject={handleLoginFailure}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>
            <LoginSocialApple
              client_id={process.env.REACT_APP_APPLE_ID || ""}
              scope={"name email"}
              redirect_uri={process.env.SIGNIN_SUCCESS_REDIRECT_URI}
              onResolve={handleLoginSuccess}
              onReject={handleLoginFailure}
            >
              <AppleLoginButton />
            </LoginSocialApple>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
