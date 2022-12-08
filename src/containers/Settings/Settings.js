import React from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';

const Nav = styled.nav`
  margin-bottom: 20px;
  width: 100%;
  padding: 7px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
`;

const StyledLink = styled(NavLink)`
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  padding: 8px 15px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.primary};
  transition: all ease-in-out 0.3s;

  &.active{
    font-weight: 600;
    background-color: ${({ theme }) => theme.accentColor.primary};
    color: ${({ theme }) => theme.backgroundColor.primary};
  }
`;

const Settings = () => (
  <div>
    <h1>Ustawienia</h1>

    <Nav>
      <StyledLink to="restaurants">Lokale</StyledLink>
      <StyledLink to="photos">Zdjecia</StyledLink>
    </Nav>

    <Outlet />
  </div>
);

export default Settings;
