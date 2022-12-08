import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Home, Settings, ShoppingCart, Grid } from 'react-feather';
import NavigationItem from './NavigationItem/NavigationItem';

const StyledNavigationItems = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;

  .nav_item_text{
    margin-left: 5px;
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: all 0.3s ease;
    vertical-align: super;
  }

  .icon{
    display: inline-block;
    padding: 16px 19px 10px 22px;
    position: relative;
    ::before{
      background-color: ${({ theme }) => theme.accentColor.primary};
      content: "";
      height: 100%;
      left: 0px;
      position: absolute;
      top: 0px;
      transition: width 0.2s ease-in;
      width: 0px;
    }
  }
`;

const NavigationItems = props => {
  const { isNavOpen, isAuthenticated, userAccess } = props;

  const userLoggedIn = <StyledNavigationItems isOpen={isNavOpen} >
    <NavigationItem link="/">
      <div className="icon">
        <Grid />
      </div>
      <span className="nav_item_text">
        Home
      </span>
    </NavigationItem>
    <NavigationItem link="/orders">
      <div className="icon">
        <ShoppingCart />
      </div>
      <span className="nav_item_text">
        Zamówienia
      </span>
    </NavigationItem>
    <NavigationItem link="/restaurant-settings">
      <div className="icon">
        <Home />
      </div>
      <span className="nav_item_text">
        Zarządzaj Lokalem
      </span>
    </NavigationItem>
    <NavigationItem link="/settings">
      <div className="icon">
        <Settings />
      </div>
      <span className="nav_item_text">
        Settings
      </span>
    </NavigationItem>
  </StyledNavigationItems>;

  const userUnauthenticated = <StyledNavigationItems isOpen={isNavOpen} >
    <NavigationItem link="/">
      <div className="icon">
        <Grid />
      </div>
      <span className="nav_item_text">
        Home
      </span>
    </NavigationItem>
  </StyledNavigationItems>;

  return (
    isAuthenticated && userAccess === "superAdmin" ? userLoggedIn : userUnauthenticated
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isLoggedIn,
  userAccess: state.auth.access
});

NavigationItems.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userAccess: PropTypes.string
};

NavigationItems.defaultProps = {
  userAccess: null
};

export default connect(mapStateToProps, null)(NavigationItems);
