import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trash2, Edit, MoreVertical, CheckSquare } from 'react-feather';
import Button from '../../../../components/UI/Button/Button';

const MenuItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.primary};
  margin-bottom: 10px;
  padding: 8px 5px;
  gap: 30px;
  align-items: center;
`;

const MenuItemData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  gap: 15px;
`;

const MenuItemContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  flex-basis: 44%;
  gap: 5px;
`;

const MenuItemContentName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const MenuItemContentDesc = styled.p`
  font-size: 12px;
`;

const MenuItemManage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuItemImageWrapper = styled.div`
  flex-basis: 7%;
  display: flex;
  align-items: center;
`;

const MenuItemImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;

const MenuItemOther = styled.div`
  flex-basis: 12%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MenuItemOtherTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const MenuItemOtherData = styled.p`
  font-size: 12px;
`;

const MenuItem = (props) => {
  const {
    id,
    name,
    image,
    desc,
    price,
    active,
    wrapping,
    handleItemDelete,
    handleItemEdit,
    handleItemOptions
  } = props;

  return (
    <MenuItemRow>
      <MenuItemData>
        <Button paddingX={5} marginX={5}>
          <MoreVertical size={16} />
        </Button>
        <MenuItemImageWrapper>
          <MenuItemImg key={id} src={`http://localhost:8080/upload/${image}`} alt={name} />
        </MenuItemImageWrapper>
        <MenuItemContent>
          <MenuItemContentName>{name}</MenuItemContentName>
          <MenuItemContentDesc>{desc}</MenuItemContentDesc>
        </MenuItemContent>
        <MenuItemOther>
          <MenuItemOtherTitle>
            Cena
          </MenuItemOtherTitle>
          <MenuItemOtherData>
            {price} zł
          </MenuItemOtherData>
        </MenuItemOther>
        <MenuItemOther>
          <MenuItemOtherTitle>
            Dostępny
          </MenuItemOtherTitle>
          <MenuItemOtherData>
            {active ? 'Tak' : 'Nie'}
          </MenuItemOtherData>
        </MenuItemOther>
        <MenuItemOther>
          <MenuItemOtherTitle>
            Opakowanie
          </MenuItemOtherTitle>
          <MenuItemOtherData>
            {wrapping ? 'Tak' : 'Nie'}
          </MenuItemOtherData>
        </MenuItemOther>
      </MenuItemData>
      <MenuItemManage>
        <Button clicked={handleItemOptions} paddingX={8} marginX={5}>
          <CheckSquare size={16} />
        </Button>
        <Button clicked={handleItemEdit} paddingX={8} marginX={5}>
          <Edit size={16} />
        </Button>
        <Button clicked={handleItemDelete} variant="alert" paddingX={8} marginX={5}>
          <Trash2 size={16} />
        </Button>
      </MenuItemManage>
    </MenuItemRow>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  wrapping: PropTypes.bool.isRequired,
  handleItemDelete: PropTypes.func.isRequired,
  handleItemEdit: PropTypes.func.isRequired,
  handleItemOptions: PropTypes.func.isRequired
}

export default MenuItem;
