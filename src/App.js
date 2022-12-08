import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './state/actions/index';
import Layout from './containers/Layout/Layout';

// import ProtectedRoute from './components/Helpers/ProtectedRoutes/ProtectedRoute';
import ProtectedRouteSuperAdmin from './components/Helpers/ProtectedRoutes/ProtectedRouteSuperAdmin';
import NoMatch from './containers/NoMatch/NoMatch';
import Home from './containers/Home/Home';
import Settings from './containers/Settings/Settings';
import Restaurants from './containers/Settings/Restaurants/Restaurants';
import Photos from './containers/Settings/Photos/Photos';
import User from './containers/User/User';
import RestaurantSettings from './containers/RestaurantSettings/RestaurantSettings';
import General from './containers/RestaurantSettings/General/General';
import Info from './containers/RestaurantSettings/Info/Info';
import Hours from './containers/RestaurantSettings/Hours/Hours';
import Menu from './containers/RestaurantSettings/Menu/Menu';
import Delivery from './containers/RestaurantSettings/Delivery/Delivery';
import Orders from './containers/Orders/Orders';

const App = (props) => {
  const { authCheckLogIn } = props;

  useEffect(() => {
    authCheckLogIn();
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <ProtectedRoute exact path="/counter" component={Counter} /> */}
          <Route element={<ProtectedRouteSuperAdmin />}>
            <Route path="/settings/*" element={<Settings />}>
              <Route index element={<Restaurants />} />
              <Route path="restaurants" element={< Restaurants />} />
              <Route path="photos" element={<Photos />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="/restaurant-settings/*" element={<RestaurantSettings />}>
              <Route index element={<General />} />
              <Route path="general" element={<General />} />
              <Route path="info" element={<Info />} />
              <Route path="menu" element={<Menu />} />
              <Route path="hours" element={<Hours />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/user/:userId" element={<User />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch => ({
  authCheckLogIn: () => dispatch(actions.authCheckLogIn())
});

App.propTypes = {
  authCheckLogIn: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(App);
