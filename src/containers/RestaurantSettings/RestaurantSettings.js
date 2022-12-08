import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Outlet, NavLink } from 'react-router-dom';

const Nav = styled.nav`
  margin-bottom: 20px;
  width: 100%;
  padding: 7px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
`;

const StyledLink = styled(NavLink)`
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  padding: 8px 15px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.primary};
  transition: all ease-in-out 0.3s;

  &.active{
    font-weight: 600;
    background-color: ${({ theme }) => theme.accentColor.primary};
    color: ${({ theme }) => theme.backgroundColor.primary};
  }
`;

const RestaurantSettings = (props) => {
  const { activeRestaurant, restaurants } = props;

  const restaurantName = restaurants.filter(restaurant =>
    restaurant._id === activeRestaurant
  )[0].name;

  return (
    <div>
      <h1>Ustawienia Restauracji: <br /> {restaurantName}</h1>

      <Nav>
        <StyledLink to="general">Ogólne</StyledLink>
        <StyledLink to="info">Informacje</StyledLink>
        <StyledLink to="menu">Menu</StyledLink>
        <StyledLink to="hours">Godziny Otwarcia</StyledLink>
        <StyledLink to="delivery">Dostawy</StyledLink>
      </Nav>

      <Outlet />
    </div>
  )
};

const mapStateToProps = (state) => ({
  activeRestaurant: state.restaurants.activeRestaurant,
  restaurants: state.restaurants.restaurants
});

RestaurantSettings.defaultProps = {
  restaurants: []
}

RestaurantSettings.propTypes = {
  activeRestaurant: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }))
}

export default connect(mapStateToProps, null)(RestaurantSettings);
