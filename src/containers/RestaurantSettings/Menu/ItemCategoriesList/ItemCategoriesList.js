import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Trash2 } from 'react-feather';
import styled from 'styled-components';
import * as actions from '../../../../state/actions/index';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal/ConfirmationModal';
import useConfirmationModal from '../../../../hooks/UseConfirmationModal/useConfirmationModal';

import Button from '../../../../components/UI/Button/Button';


const ListContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const ListItem = styled.div`
  display: flex;
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
`;

const ListItemData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ListItemManage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ListItemTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const ListItemImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-right: 20px;
`;

const ItemCategoriesList = (props) => {
  const { itemCategories, deleteItemCategory } = props;
  const [isShowingConfirmationModal, toggleConfirmationModal] = useConfirmationModal();
  const [itemCategoryId, setItemCategoryId] = useState(null);

  const handleClicked = (id) => {
    toggleConfirmationModal();
    setItemCategoryId(id);
  }

  const handleConfirm = (id) => {
    deleteItemCategory(id);
    toggleConfirmationModal();
  }

  return (
    <ListContainer>
      {(itemCategories.map(itemCategory =>
        <ListItem key={itemCategory._id}>
          <ListItemData>
            <ListItemImg key={itemCategory._id} src={`http://localhost:8080/upload/${itemCategory.image}`} alt={itemCategory.name} />
            <ListItemTitle> {itemCategory.name} </ListItemTitle>
          </ListItemData>
          <ListItemManage>
            <Button variant="alert" clicked={() => handleClicked(itemCategory._id)}>
              <Trash2 size={20} />
            </Button>
          </ListItemManage>
        </ListItem>
      ))}
      <ConfirmationModal
        show={isShowingConfirmationModal}
        clicked={toggleConfirmationModal}
        title="Potwierdź operację"
        text="Czy chcesz usunąć kategorię"
        onConfirm={() => handleConfirm(itemCategoryId)}
      />
    </ListContainer>
  )
};

const mapDispatchToProps = dispatch => ({
  deleteItemCategory: (itemCategoryId) => dispatch(actions.deleteItemCategory(itemCategoryId))
});

ItemCategoriesList.propTypes = {
  deleteItemCategory: PropTypes.func.isRequired,
  itemCategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  }))
}

ItemCategoriesList.defaultProps = {
  itemCategories: []
}

export default connect(null, mapDispatchToProps)(ItemCategoriesList);
