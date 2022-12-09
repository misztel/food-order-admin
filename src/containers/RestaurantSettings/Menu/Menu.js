import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../state/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import useModal from '../../../hooks/useModal/useModal';
import Loading from '../../../components/UI/Loading/Loading';
import ItemCategoriesList from './ItemCategoriesList/ItemCategoriesList';

import Button from '../../../components/UI/Button/Button';
import AddMenuCategoryForm from '../../../components/Forms/AddMenuCategoryForm/AddMenuCategoryForm';


const Menu = (props) => {
  const { getImages, getItemCategories, images, itemCategories, isLoadingImages, isLoadingItemCategories } = props;
  const [isShowingModal, toggleModal] = useModal();

  useEffect(() => {
    getImages();
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
    itemCategoriesList = <ItemCategoriesList itemCategories={itemCategories} isLoadingItemCategories={isLoadingItemCategories} />;
  } else {
    itemCategoriesList = <p>Brak kategorii menu w tym punkcie restauracyjnym!</p>;
  }

  return (
    <div>
      <h1>Menu</h1>

      <Button clicked={handleAddCategory}>Nowa Kategoria</Button>

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
  itemCategories: state.itemCategories.itemCategories
});

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(actions.getImages()),
  getItemCategories: (restaurantId) => dispatch(actions.getItemCategories(restaurantId))
});

Menu.propTypes = {
  getImages: PropTypes.func.isRequired,
  getItemCategories: PropTypes.func.isRequired,
  itemCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  })),
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  isLoadingImages: PropTypes.bool.isRequired,
  isLoadingItemCategories: PropTypes.bool.isRequired
}

Menu.defaultProps = {
  images: [],
  itemCategories: []
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
