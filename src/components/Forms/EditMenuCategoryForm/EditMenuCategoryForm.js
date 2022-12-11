import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AlertTriangle } from 'react-feather';
import Modal from '../../UI/Modal/Modal';
import useModal from '../../../hooks/useModal/useModal';
import Loading from '../../UI/Loading/Loading';
import * as actions from '../../../state/actions/index';

import addImage from '../../../assets/images/addimage.png';

const StyledErrorBox = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.infoColor.danger};
  border-radius: 5px;
  color: ${({ theme }) => theme.neutralColor.textPrimary};
  display: ${props => props.err ? 'flex' : 'none'};
  font-size: 12px;
  font-weight: 600;
  justify-content: flex-start;
  margin-bottom: 15px;
  padding: 12px 15px;
  width: 100%;

  svg{
    margin-right: 10px;
    width: 20px;
  }
`;

const StyledFormHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  width: 100%;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputField = styled.div`
  margin-bottom: 15px;
  position: relative;
  width: 100%;

  span{
    position: absolute;
    right: 15px;
    top: 10px;

    svg{
      width: 18px;
    }
  }

  div{
    color: ${({ theme }) => theme.infoColor.danger};
    font-size: 12px;
    font-weight: 600;
    margin: 5px 0 0 10px;
  }
`;

const StyledInput = styled.input`
  background-color: #16283f;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  padding: 12px 15px;
  transition: all 0.3s ease-in;
  width: 100%;

  ::placeholder{
    color: #B6B6BA;
  }

  &:focus{
    box-shadow: 0 0 0 0.05em ${({ theme }) => theme.accentColor.primary}, 0 0 0.15em 0.1em ${({ theme }) => theme.accentColor.primary};
  }

  &:focus-visible{
    outline: ${({ theme }) => theme.accentColor.primary} solid 2px;
  }

  &[type='submit']{
    background: ${({ theme }) => theme.accentColor.primary};
    color: ${({ theme }) => theme.neutralColor.textSecondary};
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    padding: 13px;


    &:hover{
      background: ${({ theme }) => theme.accentColor.secondary};
    }
  }
`;

const RadioInput = styled.input.attrs({
  type: "radio",
})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  & + img {
    cursor: pointer;
  }

  &:hover + img:hover {
    outline: 2px solid red;
  }

  &:checked + img:checked {
    outline: 2px solid red;
  }
`;

const ImgList = styled.div`
  display: flex;
  flex-wrap: wrap;

  & label{
    width: 30%;
    padding: 5px;
  }
`;

const AddImage = styled.img`
  max-width: 70px;
  max-height: 70px;
  border-radius:50%;
  cursor: pointer;
`;

const StyledAlertIcon = styled(AlertTriangle)`
  color: ${({ theme }) => theme.infoColor.danger};
`;

const EditMenuCategoryForm = (props) => {
  const { itemCategoryId, images, isLoading, errorResponse } = props;
  const { onNewMenuCategory, newItemCategoryErrorResponse, getItemCategory, getItemCategoryError, getItemCategoryIsLoading, itemCategory } = props;

  const [isShowingModal, toggleModal] = useModal();
  const [choosenImage, setChoosenImage] = useState();
  const [imageError, setImageError] = useState(false);
  const { register, reset, errors, handleSubmit } = useForm({
    defaultValues: { name: itemCategory.name }
  });

  useEffect(() => {
    console.log('get ITEM CATEOGRY');
    getItemCategory(itemCategoryId);
  }, [])

  useEffect(() => {
    itemCategory
      ?
      setChoosenImage(itemCategory.image)
      :
      console.log('doesnt change');
  }, [itemCategory]);

  useEffect(() => {
    reset(itemCategory);
  }, [itemCategory]);

  const handleImageModal = () => {
    toggleModal();
  }

  const handleImageChange = (img) => {
    console.log('change img');
    setChoosenImage(img.name);
    toggleModal();
  }

  const checkImageError = () => {
    if (choosenImage === undefined) {
      setImageError(true);
    } else {
      setImageError(false);
    }
  }

  const onSubmit = data => {
    if (choosenImage === undefined) {
      setImageError(true);
    } else {
      setImageError(false);
      onNewMenuCategory(data.name, choosenImage.name, window.localStorage.getItem('activeRestaurant'));
    }
  }

  return (
    <>
      {!getItemCategoryIsLoading && Object.keys(itemCategory).length !== 0
        ?
        (
          <>
            <StyledFormHeader>Edytuj Kategorię</StyledFormHeader>
            <button type="button" onClick={handleImageModal}>
              {choosenImage
                ?
                <AddImage src={itemCategory.image ? `http://localhost:8080/upload/${choosenImage}` : addImage} alt="Wybierz Zdjęcie" />
                :
                <Loading />
              }
            </button>
            {imageError ? <span>OBRAZ JEST WYMAGANY</span> : null}
            <StyledForm onSubmit={handleSubmit(onSubmit, checkImageError)}>
              <InputField>
                <StyledInput
                  name="name"
                  placeholder="Nazwa kategorii"
                  ref={register({
                    required: {
                      value: true,
                      message: 'Nazwa jest wymagana'
                    }
                  })}
                />
                <span>{errors.name && <StyledAlertIcon />}</span>
                <div>{errors.name && errors.name.message}</div>
              </InputField>
              <StyledErrorBox err={errorResponse}><AlertTriangle />{errorResponse}</StyledErrorBox>
              <StyledErrorBox err={newItemCategoryErrorResponse}><AlertTriangle />{newItemCategoryErrorResponse}</StyledErrorBox>
              <StyledInput type='submit' value='Zaktualizuj Kategorię' />
              {getItemCategoryError ? (<div>{getItemCategoryError}</div>) : null}
            </StyledForm>
          </>
        )
        :
        <Loading />
      }
      <Modal
        show={isShowingModal}
        clicked={toggleModal}
      >
        {
          isLoading
            ?
            <Loading />
            :
            (<ImgList>
              {
                images.map(image =>
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label htmlFor={image._id} key={image._id}>
                    <RadioInput type="radio" id={image._id} name="image" value={image._id} onChange={() => handleImageChange(image)} />
                    <AddImage src={`http://localhost:8080/upload/${image.name}`} alt={image.name} />
                  </label>
                )}
            </ImgList>)
        }
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  errorResponse: state.restaurants.error,
  getItemCategoryError: state.itemCategories.getItemCategoryError,
  getItemCategoryIsLoading: state.itemCategories.getItemCategoryIsLoading,
  getItemCategory: state.itemCategories.getItemCategory,
  itemCategory: state.itemCategories.itemCategory
});

const mapDispatchToProps = dispatch => ({
  onNewMenuCategory: (name, image, restaurant) => dispatch(actions.addItemCategory(name, image, restaurant)),
  getItemCategory: (itemCategoryId) => dispatch(actions.getItemCategory(itemCategoryId))
});

EditMenuCategoryForm.propTypes = {
  itemCategory: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  }),
  onNewMenuCategory: PropTypes.func.isRequired,
  getItemCategory: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  isLoading: PropTypes.bool.isRequired,
  getItemCategoryIsLoading: PropTypes.bool.isRequired,
  getItemCategoryError: PropTypes.string,
  errorResponse: PropTypes.string,
  newItemCategoryErrorResponse: PropTypes.string,
  itemCategoryId: PropTypes.string.isRequired
};

EditMenuCategoryForm.defaultProps = {
  itemCategory: {},
  images: [],
  errorResponse: null,
  getItemCategoryError: null,
  newItemCategoryErrorResponse: null
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuCategoryForm);
