import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trash2, Edit, ChevronRight, PlusCircle } from 'react-feather';
import Button from '../../../../components/UI/Button/Button';

const ListItem = styled.div`
  display: flex;
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  flex-direction: column;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  overflow: hidden;
`;

const ListItemHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  margin-left: 20px;
`;

const ToggleIcon = styled(ChevronRight)`
  transition: transform .2s ease-in-out;
  transform: ${props => props.$itemcategorytoggled ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const ItemContainer = styled.div`
  width: 100%;
  transition: all .2s ease-in-out;
  max-height: ${props => props.$itemcategorytoggled ? `${props.$containerheight}px` : '0px'};
`;

const ItemContainerInner = styled.div`
  margin-top:20px;
`;

const PlusCircleIcon = styled(PlusCircle)`
  margin-right: 15px;
`;

const ItemCategortiesListItem = (props) => {
  const {
    // key,
    itemCategory,
    handleEditClicked,
    handleToggleCategory,
    toggledCategory,
    handleClickedDelete,
    handleAddItemClicked
  } = props;

  const [isToggledCategory, setIsToggledCategory] = useState('false');
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.scrollHeight);
  })

  useEffect(() => {
    toggledCategory === itemCategory._id ? setIsToggledCategory(true) : setIsToggledCategory(false);
  }, [toggledCategory])

  return (
    <ListItem>
      <ListItemHeading>
        <ListItemData>
          <Button paddingX={10} clicked={handleToggleCategory}>
            <ToggleIcon $itemcategorytoggled={isToggledCategory} size={20} />
          </Button>
          <ListItemImg key={itemCategory._id} src={`http://localhost:8080/upload/${itemCategory.image}`} alt={itemCategory.name} />
          <ListItemTitle> {itemCategory.name} </ListItemTitle>
        </ListItemData>
        <ListItemManage>
          <Button clicked={handleEditClicked}>
            <Edit size={20} />
          </Button>
          <Button variant="alert" clicked={handleClickedDelete}>
            <Trash2 size={20} />
          </Button>
        </ListItemManage>
      </ListItemHeading>
      <ItemContainer ref={ref} $containerheight={height} $itemcategorytoggled={isToggledCategory}>
        <ItemContainerInner>
          <Button clicked={handleAddItemClicked}><PlusCircleIcon /> Dodaj Produkt</Button>
        </ItemContainerInner>
      </ItemContainer>
    </ListItem>
  );
};

ItemCategortiesListItem.propTypes = {
  itemCategory: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  handleAddItemClicked: PropTypes.func.isRequired,
  handleToggleCategory: PropTypes.func.isRequired,
  handleEditClicked: PropTypes.func.isRequired,
  handleClickedDelete: PropTypes.func.isRequired,
  toggledCategory: PropTypes.string
}

ItemCategortiesListItem.defaultProps = {
  toggledCategory: null
}

export default ItemCategortiesListItem;
