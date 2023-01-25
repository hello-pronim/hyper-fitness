import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import {
  auth,
  googleProvider,
  facebookProvider,
  appleProvider,
} from "../firebase/firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) navigate("/");
      else signOut(auth);
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const logIn = useCallback(async (authProvider) => {
    let provider = googleProvider;

    switch (authProvider) {
      case "google":
        provider = googleProvider;
        break;
      case "facebook":
        provider = facebookProvider;
        break;
      case "apple":
        provider = appleProvider;
        break;
      default:
        provider = googleProvider;
        break;
    }

    await signInWithPopup(auth, provider);
  }, []);

  const logOut = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthConsumer, AuthProvider };
