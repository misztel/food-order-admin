import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import styled from 'styled-components';
import { AlertTriangle } from 'react-feather';
import * as actions from '../../../state/actions/index';

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

const StyledAlertIcon = styled(AlertTriangle)`
  color: ${({ theme }) => theme.infoColor.danger};
`;

const AddRestaurantForm = (props) => {
  const { onNewRestaurant, errorResponse } = props;

  const [address, setAddress] = useState('');
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = data => {
    onNewRestaurant(data.name, address.value.description, address.value.place_id);
  }

  return (
    <>
      <StyledFormHeader>Dodaj nowy lokal</StyledFormHeader>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <StyledInput
            name="name"
            placeholder="Nazwa Restauracji"
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
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <GooglePlacesAutocomplete
            selectProps={{
              placeholder: 'Podaj Adres',
              address,
              onChange: setAddress,
            }}
            autocompletionRequest={{
              componentRestrictions: {
                country: ['pl'],
              }
            }}
          />
        </div>
        <StyledErrorBox err={errorResponse}><AlertTriangle />{errorResponse}</StyledErrorBox>
        <StyledInput type='submit' value='Dodaj Restauracje' />
      </StyledForm>
    </>
  );
};

const mapStateToProps = state => ({
  errorResponse: state.restaurants.error
});

const mapDispatchToProps = dispatch => ({
  onNewRestaurant: (name, address, placeId) => dispatch(actions.addRestaurant(name, address, placeId))
});


AddRestaurantForm.propTypes = {
  onNewRestaurant: PropTypes.func.isRequired,
  errorResponse: PropTypes.string
};

AddRestaurantForm.defaultProps = {
  errorResponse: null
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurantForm);
