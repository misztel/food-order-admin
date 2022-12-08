import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AlertTriangle } from 'react-feather';
import Modal from '../../UI/Modal/Modal';
import useModal from '../../../hooks/useModal/useModal';
import Loading from '../../UI/Loading/Loading';

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

const AddMenuCategoryForm = (props) => {
  const { images, isLoading, errorResponse } = props;

  const [isShowingModal, toggleModal] = useModal();
  const [choosenImage, setChoosenImage] = useState();
  const [imageError, setImageError] = useState(false);
  const { register, errors, handleSubmit } = useForm();


  const handleImageModal = () => {
    toggleModal();
  }

  const handleImageChange = (img) => {
    setChoosenImage(img);
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
      console.log(data.name, choosenImage);
    }
  }

  return (
    <>
      <StyledFormHeader>Dodaj Kategorię</StyledFormHeader>
      <button type="button" onClick={handleImageModal}>
        {!choosenImage
          ?
          <AddImage src={addImage} alt="Wybierz Zdjęcie" />
          :
          <AddImage src={`http://localhost:8080/upload/${choosenImage.name}`} alt="Wybierz Zdjęcie" />
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
        <StyledInput type='submit' value='Dodaj Kategorię' />
      </StyledForm>

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
  errorResponse: state.restaurants.error
});



AddMenuCategoryForm.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  isLoading: PropTypes.bool.isRequired,
  errorResponse: PropTypes.string
};

AddMenuCategoryForm.defaultProps = {
  images: [],
  errorResponse: null
};

export default connect(mapStateToProps, null)(AddMenuCategoryForm);
