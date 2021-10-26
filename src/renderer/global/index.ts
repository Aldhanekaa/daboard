import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import RootReducer from './reducers';

const middlewares = [thunk];

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export type RootStore = ReturnType<typeof RootReducer>;

export default Store;
