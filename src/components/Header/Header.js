import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as actions from '../../state/actions/index';
import NavigationToggler from './Navigation/NavigationToggler/NavigationToggler';
import Button from '../UI/Button/Button';
// import Logo from '../../assets/images/CodingDecks.svg';
import RestaurantPicker from './RestaurantPicker/RestaurantPicker';

const StyledHeader = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.backgroundColor.secondary};
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 20px;
`;

const StyledH2 = styled.h2`
  padding: 5px 25px;
`;

// const StyledLogo = styled.img`
//   margin-left: 20px;
//   width: 200px;
// `;

const Header = props => {
  const {
    toggleNav,
    isNavOpen,
    isLoggedIn,
    userName,
    userId,
    logout
  } = props;

  return (
    <StyledHeader>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavigationToggler clicked={toggleNav} isNavOpen={isNavOpen} />
        <StyledH2>Food Order App</StyledH2>
        {/* <StyledLogo src={Logo} alt="" /> */}
        <RestaurantPicker />

      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!isLoggedIn
          ?
          <> </>
          :
          <div>
            <Link to={{ pathname: `/user/${userId}` }}>{userName}</Link>
            <Button clicked={logout}>Logout</Button>
          </div>
        }
      </div>
    </StyledHeader>
  )
};

Header.defaultProps = {
  userName: null,
  userId: null
};

Header.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  userId: PropTypes.string
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  userName: state.auth.name,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
