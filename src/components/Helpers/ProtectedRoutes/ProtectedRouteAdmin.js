import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteAdmin({ isAuthenticated, userAccess }) {
  return (
    isAuthenticated && userAccess === "admin" ? <Outlet /> : <Navigate to="/" />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isLoggedIn,
  userAccess: state.auth.access
});

ProtectedRouteAdmin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userAccess: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(ProtectedRouteAdmin);
