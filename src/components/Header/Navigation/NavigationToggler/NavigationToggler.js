import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledNavigationToggler = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 24px;
  position: relative;
  width: 40px;
  z-index: 99;
`;

const StyledNavigationTogglerInner = styled.span`
  background-color: #fff;
  border-radius: 4px;
  height: 3px;
  position: absolute;
  top: 2px;
  transition: transform .3s cubic-bezier(.68,-.55,.265,1.55);
  width: 30px;
  // transform: ${props => props.isNavOpen ? "translate3d(0,10px,0) rotate(135deg);" : "rotate(0deg)"};

  &:before{
    background: #fff;
    border-radius: 4px;
    content: '';
    height: 3px;
    left: ${props => props.isNavOpen ? "10px" : "0px"};
    width: 30px;
    position: absolute;
    top: 8px;
    transition: all .3s cubic-bezier(.68,-.55,.265,1.55);
  }

  &:after{
    background: #fff;
    border-radius: 4px;
    content: '';
    height: 3px;
    position: absolute;
    top: 16px;
    transition: transform .3s cubic-bezier(.68,-.55,.265,1.55);
    transition-delay: 75ms;
    width: 30px;
    // transform: ${props => props.isNavOpen ? "translate3d(0,-20px,0) rotate(-270deg)" : "rotate(0deg)"};
  }
`;

const NavigationToggler = props => {
  const { clicked, isNavOpen } = props;
  return (
    <StyledNavigationToggler onClick={clicked}>
      <StyledNavigationTogglerInner isNavOpen={isNavOpen} />
    </StyledNavigationToggler>
  );
};

NavigationToggler.propTypes = {
  clicked: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired
};

export default NavigationToggler;
