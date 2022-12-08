import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../components/Theme/ThemeConfig';
import useDarkMode from '../../hooks/useDarkTheme/useDarkTheme';
import ThemeContext from '../../components/Theme/ThemeContext';
import GlobalStyle from '../../styles/globalStyles';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from '../../components/UI/Modal/Modal';
import useModal from '../../hooks/useModal/useModal';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';


const StyledMain = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  position: relative;
`;

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Layout = props => {
  const { children } = props;

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isShowingLogin, toggleLogin] = useModal();

  const navTogglerHandler = () => setIsNavOpen(!isNavOpen);

  const navCloseHandler = () => setIsNavOpen(false);
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ThemeContext.Provider
        value={{ theme, themeToggler, mountedComponent }}
      >
        <Header
          toggleNav={navTogglerHandler}
          closeNav={navCloseHandler}
          isNavOpen={isNavOpen}
          loginModal={toggleLogin}
        />
      </ThemeContext.Provider>
      <StyledMain>
        <Sidebar isNavOpen={isNavOpen} />
        <StyledContainer>
          <div style={{ width: '100%', padding: '30px 30px 30px 95px' }}>
            {children}
          </div>
        </StyledContainer>
      </StyledMain>

      <Modal show={isShowingLogin} clicked={toggleLogin}>
        <LoginForm loggedIn={toggleLogin} />
      </Modal>

    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
