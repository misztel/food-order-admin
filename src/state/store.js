import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import usersReducer from './reducers/users';
import restaurantsReducer from './reducers/restaurants';
import imagesReducer from './reducers/images';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  restaurants: restaurantsReducer,
  images: imagesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
