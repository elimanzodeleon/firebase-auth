import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

// wrapper for basic route. we will use this for routes that must have user logged in
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuthContext();
  return (
    // if there is a validated user, render the route requested, else redirect user to login page
    <Route
      {...rest}
      // props in inline function include: history, location, match. see docs for more
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
