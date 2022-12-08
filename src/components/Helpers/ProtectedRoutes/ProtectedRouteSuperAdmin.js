import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteSuperAdmin({ isAuthenticated, userAccess }) {
  return (
    isAuthenticated && userAccess === "superAdmin" ? <Outlet /> : <Navigate to="/" />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isLoggedIn,
  userAccess: state.auth.access
});

ProtectedRouteSuperAdmin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userAccess: PropTypes.string
}

ProtectedRouteSuperAdmin.defaultProps = {
  userAccess: null
};

export default connect(mapStateToProps)(ProtectedRouteSuperAdmin);
