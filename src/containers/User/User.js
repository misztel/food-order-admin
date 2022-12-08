import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import * as actions from '../../state/actions/index';

const User = (props) => {
  const { getUser, name, email, access, avatarUrl } = props;

  const { userId } = useParams();

  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <div>
      <h1>User</h1>
      <p>user id: {userId}</p>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>access: {access}</p>
      <p>avatarUrl: {avatarUrl} </p>
      {avatarUrl ? <img src={`http://localhost:8080/${avatarUrl}`} alt='avatar' /> : null}
    </div>
  )
};

const mapStateToProps = (state) => ({
  name: state.users.name,
  email: state.users.email,
  access: state.users.access,
  avatarUrl: state.users.avatarUrl
});

const mapDispatchToProps = dispatch => ({
  getUser: (id) => dispatch(actions.getUser(id))
});

User.defaultProps = {
  name: null,
  email: null,
  access: null,
  avatarUrl: null
};

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getUser: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  access: PropTypes.string,
  avatarUrl: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
