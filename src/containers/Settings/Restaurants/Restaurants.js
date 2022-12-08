import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Trash2 } from 'react-feather';
import Modal from '../../../components/UI/Modal/Modal';
import useModal from '../../../hooks/useModal/useModal';
import ConfirmationModal from '../../../components/UI/ConfirmationModal/ConfirmationModal';
import useConfirmationModal from '../../../hooks/UseConfirmationModal/useConfirmationModal';
import * as actions from '../../../state/actions/index';
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading';
import AddRestaurantForm from '../../../components/Forms/AddRestaurantForm/AddRestaurantForm';

const RestaurantsContainer = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const RestaurantsRow = styled.div`
  display: flex;
  border-radius: 10px;
  width: 100%;
  padding: 7px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
`;

const Restaurants = (props) => {
  const { getRestaurants, archiveRestaurant, restaurants, isLoading } = props;

  const [isShowingConfirmationModal, toggleConfirmationModal] = useConfirmationModal();
  const [isShowingModal, toggleModal] = useModal();

  const [restaurantId, setRestaurantId] = useState(null);

  const archive = true;

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleClicked = (id) => {
    toggleConfirmationModal();
    setRestaurantId(id);
  }

  const handleConfirm = (id, archiveState) => {
    archiveRestaurant(id, archiveState);
    toggleConfirmationModal();
  }

  const handleNewRestaurant = () => {
    toggleModal();
  }

  const restaurantItems = restaurants.filter(restaurant => restaurant.archived === false).map((restaurant) =>
    <RestaurantsRow key={restaurant._id}>
      {restaurant.name}
      <Button variant="alert" clicked={() => handleClicked(restaurant._id)}>
        <Trash2 size={20} />
      </Button>
    </RestaurantsRow>
  );

  return (
    <div>
      <h2>Lista Lokali</h2>
      {
        isLoading
          ?
          <Loading />
          :
          <div>
            <RestaurantsContainer>
              {restaurantItems}
            </RestaurantsContainer>
            <ButtonWrapper>
              <Button clicked={handleNewRestaurant}>Dodaj Lokal</Button>
            </ButtonWrapper>
          </div>
      }
      <ConfirmationModal
        show={isShowingConfirmationModal}
        clicked={toggleConfirmationModal}
        title="Potwierdź operację"
        text="Potwierdź archiwizację lokalu"
        onConfirm={() => handleConfirm(restaurantId, archive)}
      />
      <Modal
        show={isShowingModal}
        clicked={toggleModal}
      >
        <AddRestaurantForm />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants.restaurants,
  isLoading: state.restaurants.isLoading,
  error: state.restaurants.error
});

const mapDispatchToProps = dispatch => ({
  getRestaurants: () => dispatch(actions.getRestaurants()),
  archiveRestaurant: (id, archive) => dispatch(actions.archiveRestaurant(id, archive))
});

Restaurants.defaultProps = {
  restaurants: []
}

Restaurants.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  archiveRestaurant: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })),
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
