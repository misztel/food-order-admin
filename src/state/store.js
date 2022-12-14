import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import usersReducer from './reducers/users';
import restaurantsReducer from './reducers/restaurants';
import imagesReducer from './reducers/images';
import itemCategoriesReducer from './reducers/itemCategories';
import itemsReducer from './reducers/items';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  restaurants: restaurantsReducer,
  images: imagesReducer,
  itemCategories: itemCategoriesReducer,
  items: itemsReducer
})

// Be sure to ONLY add this middleware in development!
const middleware = process.env.NODE_ENV !== 'production' ?
  // eslint-disable-next-line global-require
  [require('redux-immutable-state-invariant').default(), thunk] :
  [thunk];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// for prod
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// for development
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
