import { createContext, useCallback, useEffect, useReducer } from "react";

const INITIALIZE = "INITIALIZE";
const SIGN_OUT = "SIGN_OUT";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  authType: "",
};

const reducer = (state, action) => {
  if (action.type === INITIALIZE) {
    const { isAuthenticated, user, authType } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      authType,
    };
  }
  if (action.type === SIGN_OUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      authType: "",
    };
  }
  return state;
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    localStorage.clear();
    dispatch({
      type: INITIALIZE,
      payload: {
        isAuthenticated: false,
        user: null,
        authType: "",
      },
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const data = localStorage.getItem("user");

      dispatch({
        type: INITIALIZE,
        payload: {
          isAuthenticated: true,
          user: data?.user,
          authType: data?.authType,
        },
      });
    }
  }, []);

  const signIn = useCallback((authUser, authUserType) => {
    localStorage.setItem("user", { user: authUser, authType: authUserType });
    dispatch({
      type: INITIALIZE,
      payload: {
        isAuthenticated: true,
        user: authUser,
        authType: authUserType,
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
        authType: "",
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
