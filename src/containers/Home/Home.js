import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';

const Home = (props) => {

  const {
    isLoggedIn,
    userName
  } = props;

  return (
    <>
      {!isLoggedIn
        ?
        <LoginForm loggedIn={isLoggedIn} />
        :
        <div>
          Hello{userName}
        </div>
      }
    </>
  );
};

Home.defaultProps = {
  userName: null
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  userName: state.auth.name
})

export default connect(mapStateToProps, null)(Home);
