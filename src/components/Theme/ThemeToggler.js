import React, { useContext } from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'react-feather';
import ThemeContext from './ThemeContext';

const ToggleSwitch = styled.div`
  display: inline-block;
  cursor: pointer;
  height: 25px;
  position: relative;
  width: 50px;
  & > input {
    height: 0;
    opacity: 0;
    width: 0;
  }
`;

const ToggleSlider = styled.span`
  background-color: #828282;
  border-radius: 40px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
  -webkit-transition: 0.4s;
  &:before {
    background-color: white;
    border-radius: 50%;
    bottom: 4px;
    content: '';
    height: 18px;
    left: 5px;
    position: absolute;
    transform: ${props => props.theme === 'light' ? 'translateX(0px);' : 'translateX(22px);'};
    transition: 0.4s;
    -webkit-transition: 0.4s;
    width: 18px;
    z-index: 3;
  }
`;

const MoonIcon = styled.div`
  color: #fff;
  height: 16px;
  position: absolute;
  right: 6px;
  top: 1px;
  width: 16px;
  z-index: 2;

  svg{
    width: 100%;
  }
`;

const SunIcon = styled.div`
  color: #fff;
  height: 17px;
  left: 6px;
  position: absolute;
  top: 1px;
  width: 17px;
  z-index: 2;

  svg{
    width: 100%;
  }
`;

const ThemeToggler = () => {
  const { theme, themeToggler } = useContext(ThemeContext);

  return (
    <ToggleSwitch onClick={themeToggler} theme={theme}>
      <input type="checkbox" />
      <MoonIcon>
        <Sun />
      </MoonIcon>
      <SunIcon>
        <Moon />
      </SunIcon>
      <ToggleSlider theme={theme} />
    </ToggleSwitch>
  );
};

export default ThemeToggler;
