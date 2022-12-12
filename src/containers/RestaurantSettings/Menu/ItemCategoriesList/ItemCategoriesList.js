import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../../../../components/UI/Modal/Modal';
import useModal from '../../../../hooks/useModal/useModal';
import * as actions from '../../../../state/actions/index';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal/ConfirmationModal';
import useConfirmationModal from '../../../../hooks/UseConfirmationModal/useConfirmationModal';
import EditMenuCategoryForm from '../../../../components/Forms/EditMenuCategoryForm/EditMenuCategoryForm';
import ItemCategortiesListItem from './ItemCategortiesListItem';



const ListContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const ItemCategoriesList = (props) => {
  const { itemCategories, deleteItemCategory, images, isLoadingImages } = props;
  const [isShowingConfirmationModal, toggleConfirmationModal] = useConfirmationModal();
  const [itemCategoryId, setItemCategoryId] = useState(null);
  const [isShowingModal, toggleModal] = useModal();
  const [toggledCategory, setToggledCategory] = useState(null);

  const handleClickedDelete = (id) => {
    toggleConfirmationModal();
    setItemCategoryId(id);
  }

  const handleConfirmDelete = (id) => {
    deleteItemCategory(id);
    toggleConfirmationModal();
  }

  const handleEditClicked = (id) => {
    toggleModal();
    setItemCategoryId(id);
  }

  const handleToggleCategory = (id) => {
    toggledCategory === id ? setToggledCategory(null) : setToggledCategory(id);
  }

  return (
    <ListContainer>
      {(itemCategories.map(itemCategory =>
        <ItemCategortiesListItem
          key={itemCategory._id}
          itemCategory={itemCategory}
          toggledCategory={toggledCategory}
          handleToggleCategory={() => handleToggleCategory(itemCategory._id)}
          handleEditClicked={() => handleEditClicked(itemCategory._id)}
          handleClickedDelete={() => handleClickedDelete(itemCategory._id)}
        />

      ))}
      <ConfirmationModal
        show={isShowingConfirmationModal}
        clicked={toggleConfirmationModal}
        title="Potwierdź operację"
        text="Czy chcesz usunąć kategorię"
        onConfirm={() => handleConfirmDelete(itemCategoryId)}
      />
      <Modal
        show={isShowingModal}
        clicked={toggleModal}
      >
        <EditMenuCategoryForm
          images={images}
          isLoading={isLoadingImages}
          itemCategoryId={itemCategoryId}
        />
      </Modal>
    </ListContainer>
  )
};

const mapDispatchToProps = dispatch => ({
  deleteItemCategory: (itemCategoryId) => dispatch(actions.deleteItemCategory(itemCategoryId))
});

ItemCategoriesList.propTypes = {
  isLoadingImages: PropTypes.bool.isRequired,
  deleteItemCategory: PropTypes.func.isRequired,
  itemCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  })),
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
}

ItemCategoriesList.defaultProps = {
  itemCategories: [],
  images: [],
}

export default connect(null, mapDispatchToProps)(ItemCategoriesList);
