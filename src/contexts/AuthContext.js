// context used so that each page/component has access to the user that is currently logged in
import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    // we need to return because its a promise (this is async)
    // if using our own backend, we can just change this to communicate with our backend
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    // if using our own backend, we can just change this to communicate with our backend
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    // if using our own backend, we can just change this to communicate with our backend
    return auth.signOut();
  };

  const resetPassword = (email) => {
    // if using our own backend, we can just change this to communicate with our backend
    return auth.sendPasswordResetEmail(email);
  };

  // updateEmail + updatePw need to be called on currentUser not auth.
  // this is because the functions needs access to the current user object
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    // on init App render check if there is user signed in
    // onAuthStateChange returns method that allows us to unsibscribe on unmount of component
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // user has been verified and loaded in so we can setloading to false
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {/* only render children if we are not loading meaning user has been verified or there is no current user */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// global context
export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
