import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNavigationItem = styled.li`
  width: 100%;
  a{
    color: #f8f8f8;
    display: block;
    font-size: 14px;
    font-weight: 600;
    padding: 7px 0;
    text-decoration: none;
    transition: all 0.3s ease-in;
    .icon{
      border-left: solid 0px  ${({ theme }) => theme.accentColor.primary};;
      transition: all 0.1s ease-in;
    }
  }
  a:hover{
    color: ${({ theme }) => theme.accentColor.primary};
  }
  a.active{
    color:  ${({ theme }) => theme.accentColor.primary};;

    .icon{
      ::before{
        width: 4px;
      }
    }
  }
`;

const NavigationItem = (props) => {
  const { link, children } = props;
  return (
    <StyledNavigationItem>
      <NavLink to={link} >
        {children}
      </NavLink>
    </StyledNavigationItem>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node])
  ).isRequired,
  link: PropTypes.string.isRequired
};

export default NavigationItem;
