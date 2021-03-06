import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    loggedIn ? (
      <Redirect to="/stream" />
    ) : (
      <Component {...props} />
    )
  )}/>
);

const Protected = ({component: Component, path, loggedIn}) => (
  <Route exact path={path} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const mapStateToProps = state => (
  {
    currentUser: state.session.currentUser,
    loggedIn: Boolean(state.session.currentUser)
  }
);

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Auth));
