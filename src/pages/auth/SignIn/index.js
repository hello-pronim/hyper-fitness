import React, { useContext, useState } from "react";
import AppleLogin from "react-apple-login";
import FacebookLogin from "@greatsumini/react-facebook-login";
import GoogleLogin from "@leecheuk/react-google-login";

import "./index.css";
import { AuthContext } from "../../../contexts/AuthContext";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const responseGoogle = (response) => {
    if (response.error === "popup_closed_by_user") {
      setErrorMsg("Authentication canceled by user");
    }
    console.log("google", response);
    // signIn({ user, google: response });
  };

  const responseFacebook = (response) => {
    console.log("google", response);
    // setUser({ ...user, facebook: response });
  };

  const responseApple = (response) => {
    console.log("google", response);
    // setUser({ ...user, apple: response });
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
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
            />
            <AppleLogin
              clientId="YOUR_APPLE_CLIENT_ID"
              redirectURI="https://your-redirect-uri/"
              onSuccess={responseApple}
              onError={responseApple}
              scope={["name", "email"]}
              buttonText="Continue with Apple"
              usePopup={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
