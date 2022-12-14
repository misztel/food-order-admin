import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const MenuItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow: hidden;
`;

const MenuItemList = (props) => {
  const { menuItems, itemCategoryId } = props;

  const handleItemDelete = (id) => {
    console.log('Delete:', id)
  }

  const handleItemEdit = (id) => {
    console.log('Edit:', id)
  }

  const handleItemOptions = (id) => {
    console.log('Options:', id)
  }

  return (
    <MenuItemContainer>
      {
        menuItems.filter(item => itemCategoryId === item.itemCategory ? item : null)
          .map(item => (
            <MenuItem
              key={item._id}
              id={item._id}
              name={item.name}
              desc={item.desc}
              image={item.image}
              active={item.active}
              price={item.price}
              wrapping={item.wrapping}
              handleItemDelete={() => handleItemDelete(item._id)}
              handleItemEdit={() => handleItemEdit(item._id)}
              handleItemOptions={() => handleItemOptions(item._id)}
            />
          ))
      }
    </MenuItemContainer>
  );
};

MenuItemList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    active: PropTypes.bool,
    wrapping: PropTypes.bool
  })),
  itemCategoryId: PropTypes.string.isRequired
}

MenuItemList.defaultProps = {
  menuItems: []
}

export default MenuItemList;
