import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isLoggedIn
});

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(ProtectedRoute);
