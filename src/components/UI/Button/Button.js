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
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.accentColor.primary};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.backgroundColor.primary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin: ${(props) => props.marginX ? `5px ${props.marginX}px` : '5px 10px'};
  padding: ${(props) => props.paddingX ? `10px ${props.paddingX}px` : '10px 20px'};
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

const Button = ({ children, clicked, variant, paddingX, marginX }) => (
  <StyledButton onClick={clicked} variant={variant} paddingX={paddingX} marginX={marginX}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  paddingX: PropTypes.number,
  marginX: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  clicked: PropTypes.func,
  variant: PropTypes.string
};

Button.defaultProps = {
  paddingX: null,
  marginX: null,
  clicked: null,
  variant: 'primary'
};

export default Button;
