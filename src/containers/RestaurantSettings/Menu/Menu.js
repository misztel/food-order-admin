import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PlusCircle } from 'react-feather';
import styled from 'styled-components';
import * as actions from '../../../state/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import useModal from '../../../hooks/useModal/useModal';
import Loading from '../../../components/UI/Loading/Loading';
import ItemCategoriesList from './ItemCategoriesList/ItemCategoriesList';

import Button from '../../../components/UI/Button/Button';
import AddMenuCategoryForm from '../../../components/Forms/AddMenuCategoryForm/AddMenuCategoryForm';

const MenuTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  margin-right: 20px;
`;

const PlusCircleIcon = styled(PlusCircle)`
  margin-right: 15px;
`;

const Menu = (props) => {
  const { getImages, getItemCategories, getMenuItems, images, itemCategories, menuItems, isLoadingMenuItems, isLoadingImages, isLoadingItemCategories } = props;
  const [isShowingModal, toggleModal] = useModal();

  useEffect(() => {
    getImages();
  }, [])

  useEffect(() => {
    console.log('get menu items');
    getMenuItems(window.localStorage.getItem('activeRestaurant'));
  }, [])

  useEffect(() => {
    getItemCategories(window.localStorage.getItem('activeRestaurant'));
  }, [])

  const handleAddCategory = () => {
    toggleModal();
  }

  let itemCategoriesList;
  if (isLoadingItemCategories) {
    itemCategoriesList = <Loading />;
  }
  else if (itemCategories.length > 0) {
    itemCategoriesList = <ItemCategoriesList
      itemCategories={itemCategories}
      isLoadingItemCategories={isLoadingItemCategories}
      isLoadingImages={isLoadingImages}
      images={images}
      menuItems={menuItems}
      isLoadingMenuItems={isLoadingMenuItems}
    />;
  } else {
    itemCategoriesList = <p>Brak kategorii menu w tym punkcie restauracyjnym!</p>;
  }

  return (
    <div>
      <MenuTitleContainer>
        <Title>Menu</Title>
        <Button clicked={handleAddCategory}><PlusCircleIcon /> Nowa Kategoria</Button>
      </MenuTitleContainer>
      <Modal
        show={isShowingModal}
        clicked={toggleModal}
      >
        <AddMenuCategoryForm images={images} isLoading={isLoadingImages} />
      </Modal>

      {itemCategoriesList}
    </div>
  )
};

const mapStateToProps = state => ({
  images: state.images.images,
  isLoadingImages: state.images.isLoading,
  isLoadingItemCategories: state.images.isLoading,
  itemCategories: state.itemCategories.itemCategories,
  menuItems: state.items.items,
  isLoadingMenuItems: state.items.isLoading
});

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(actions.getImages()),
  getItemCategories: (restaurantId) => dispatch(actions.getItemCategories(restaurantId)),
  getMenuItems: (restaurantId) => dispatch(actions.getMenuItems(restaurantId))
});

Menu.propTypes = {
  getImages: PropTypes.func.isRequired,
  getItemCategories: PropTypes.func.isRequired,
  getMenuItems: PropTypes.func.isRequired,
  itemCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  })),
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    active: PropTypes.bool,
    wrapping: PropTypes.bool
  })),
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  isLoadingImages: PropTypes.bool.isRequired,
  isLoadingItemCategories: PropTypes.bool.isRequired,
  isLoadingMenuItems: PropTypes.bool.isRequired
}

Menu.defaultProps = {
  images: [],
  itemCategories: [],
  menuItems: []
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
