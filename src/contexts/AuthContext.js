import { createContext, useCallback, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const INITIALIZE = "INITIALIZE";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  provider: "",
};

const reducer = (state, action) => {
  if (action.type === INITIALIZE) {
    const { isAuthenticated, user, provider } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      provider,
    };
  }
  if (action.type === SIGN_OUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      provider: "",
    };
  }
  return state;
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    localStorage.clear();
    dispatch({
      type: INITIALIZE,
      payload: {
        isAuthenticated: false,
        user: null,
        provider: "",
      },
    });
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      navigate("/sign-in");
    } else {
      const data = JSON.parse(localStorage.getItem("user"));

      dispatch({
        type: INITIALIZE,
        payload: {
          isAuthenticated: true,
          user: data?.user,
          provider: data?.provider,
        },
      });
    }
  }, []);

  const signIn = useCallback((authUser, authProvider) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ user: authUser, provider: authProvider })
    );
    dispatch({
      type: INITIALIZE,
      payload: {
        isAuthenticated: true,
        user: authUser,
        provider: authProvider,
      },
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    dispatch({
      type: INITIALIZE,
      payload: {
        isAuthenticated: false,
        user: null,
        provider: "",
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, initialize, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthConsumer, AuthProvider };
