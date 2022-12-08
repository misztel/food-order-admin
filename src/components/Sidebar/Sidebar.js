import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavigationItems from '../Header/Navigation/NavigationItems/NavigationItems';

const StyledSidebar = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
  bottom: 0px;
  position: fixed;
  box-shadow: 0 5px 5px rgb(0 0 0 / 35%);
  margin-left: 0px;
  overflow-x: hidden;
  transition: width 0.3s ease-in-out;
  top: 60px;
  white-space: nowrap;
  width: ${props => props.isNavOpen ? "220px" : "65px"};
  z-index: 1;
`;

const Sidebar = props => {
  const {
    isNavOpen,
  } = props;

  return (
    <StyledSidebar isNavOpen={isNavOpen}>
      <NavigationItems isNavOpen={isNavOpen} />
    </StyledSidebar>
  )
};

Sidebar.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
