import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as actions from '../../../state/actions/index';
import Loading from '../../UI/Loading/Loading';

const RestaurantsDropdown = styled.div`
  width: 250px;

  & select{
    max-width: 100%;
  }
`;

const RestaurantPicker = (props) => {
  const { getRestaurants, restaurants, getActiveRestaurant, changeActiveRestaurant, activeRestaurant, isLoadingActiveRestaurant } = props;

  useEffect(() => {
    getRestaurants();
    getActiveRestaurant();
  }, []);

  const handleRestaurantChange = (e) => {
    changeActiveRestaurant(e.target.value);
  }

  return (
    <div>
      {isLoadingActiveRestaurant
        ?
        <Loading />
        :
        <div>
          <RestaurantsDropdown>
            <select onChange={handleRestaurantChange} value={activeRestaurant}>
              {restaurants.map(restaurant =>
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              )}
            </select>
          </RestaurantsDropdown>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants.restaurants,
  activeRestaurant: state.restaurants.activeRestaurant,
  isLoadingActiveRestaurant: state.restaurants.isLoadingActiveRestaurant,
  error: state.restaurants.error
});

const mapDispatchToProps = dispatch => ({
  getRestaurants: () => dispatch(actions.getRestaurants()),
  getActiveRestaurant: () => dispatch(actions.getActiveRestaurant()),
  changeActiveRestaurant: (restaurantId) => dispatch(actions.changeActiveRestaurant(restaurantId))
});

RestaurantPicker.defaultProps = {
  restaurants: [],
  activeRestaurant: undefined
}

RestaurantPicker.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  getActiveRestaurant: PropTypes.func.isRequired,
  isLoadingActiveRestaurant: PropTypes.bool.isRequired,
  changeActiveRestaurant: PropTypes.func.isRequired,
  activeRestaurant: PropTypes.string,
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }))
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPicker);
