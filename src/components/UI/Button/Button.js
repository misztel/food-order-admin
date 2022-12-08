import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const variantOptions = {
  primary: {
    backgroundColor: ({ theme }) => theme.accentColor.primary,
    active: ({ theme }) => theme.accentColor.primary
  },
  alert: {
    backgroundColor: ({ theme }) => theme.infoColor.danger,
    active: ({ theme }) => theme.infoColor.danger
  },
};

const StyledButton = styled.button`
  background: ${({ theme }) => theme.accentColor.primary};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.backgroundColor.primary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin: 5px 10px;
  padding: 10px 20px;
  transition: all 0.3 ease;

  ${({ variant }) =>
    variant &&
    variantOptions[variant] &&
    css`
      background-color: ${variantOptions[variant].backgroundColor};
      &:hover{
        background: ${variantOptions[variant].active};
      }
   `}
`;

const Button = ({ children, clicked, variant }) => (
  <StyledButton onClick={clicked} variant={variant}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  clicked: PropTypes.func,
  variant: PropTypes.string
};

Button.defaultProps = {
  clicked: null,
  variant: 'primary'
};

export default Button;
