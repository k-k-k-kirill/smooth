import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, Reducer, Store } from 'redux'
import { Provider } from 'react-redux'
import authState from './store/reducers/auth/types'
import { devToolsEnhancer } from 'redux-devtools-extension';

//Reducers
import authReducer from './store/reducers/auth/auth'

export interface ApplicationState {
  auth: authState
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  auth: authReducer
})

const store: Store<Reducer> = createStore(rootReducer, devToolsEnhancer({}))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
