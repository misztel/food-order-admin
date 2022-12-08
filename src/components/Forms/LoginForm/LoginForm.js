import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const LoginForm = (props) => {
  const { onAuth, errorResponse } = props;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => {
    onAuth(data.email, data.password);
  }

  return (
    <>
      <StyledFormHeader>Login</StyledFormHeader>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <StyledInput
            name='email'
            placeholder='email'
            ref={register({
              required: {
                value: true,
                message: 'Email is required'
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })} />
          <span>{errors.email && <StyledAlertIcon />}</span>
          <div>{errors.email && errors.email.message}</div>
        </InputField>
        <InputField>
          <StyledInput
            name='password'
            type='password'
            placeholder='password'
            ref={register({
              required: {
                value: true,
                message: 'Password is required'
              }
            })} />
          <span>{errors.password && <StyledAlertIcon />}</span>
          <div>{errors.password && errors.password.message}</div>
        </InputField>
        <StyledErrorBox err={errorResponse}><AlertTriangle />{errorResponse}</StyledErrorBox>
        <StyledInput type='submit' value='login' />
      </StyledForm>
    </>
  );
}

const mapStateToProps = state => ({
  errorResponse: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.auth(email, password))
})

LoginForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
  errorResponse: PropTypes.string
}

LoginForm.defaultProps = {
  errorResponse: null
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
