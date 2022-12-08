import { css } from 'styled-components';

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  fablet: '998px',
  desktop: '1200px',
  bigDesktop: '1400px'
};

const themeConfig = {
  fontFamily: '"Montserrat", sans-serif',
  secondaryFontFamily: '',
  shadow: '',
  spacing: {
    sectionMargins: css`
      margin-top: 100px;
      margin-bottom: 100px;
    `,
  },
  button: {
    round: '5px',
    padding: '12px 24px',
    margin: '30px 0px',
    fontWeight: '600',
    fontSize: '14px',
  },
  media: {
    mobile: `(min-width: ${breakpoints.mobile})`,
    tablet: `(min-width: ${breakpoints.tablet})`,
    fablet: `(min-width: ${breakpoints.fablet})`,
    desktop: `(min-width: ${breakpoints.desktop})`,
    bigDesktop: `(min-width: ${breakpoints.bigDesktop})`,
    maxMobile: `(max-width: ${breakpoints.mobile})`,
    maxTablet: `(max-width: ${breakpoints.tablet})`,
  },
};

export const darkTheme = {
  accentColor: {
    primary: '#30EB94',
    secondary: '#1FBF75',
    tertiary: '#4579F5',
  },
  neutralColor: {
    white: '#fff',
    textPrimary: '#FFF',
    textSecondary: '#111D2D',
    shadow: '#1B0A52'
  },
  backgroundColor: {
    primary: '#091019',
    secondary: '#111D2D',
    tertiary: '#33334B'
  },
  infoColor: {
    danger: '#da004b'
  },
  ...themeConfig,
};

export const lightTheme = {
  accentColor: {
    primary: '#30EB94',
    secondary: '#1FBF75',
    tertiary: '#4579F5',
  },
  neutralColor: {
    white: '#fff',
    textPrimary: '#536273',
    textSecondary: '#F9FCFF',
    shadow: '#1B0A52'
  },
  backgroundColor: {
    primary: '#F9FCFF',
    secondary: '#C0CBD7',
    tertiary: '#026185'
  },
  infoColor: {
    danger: '#e63946'
  },
  ...themeConfig,
};
