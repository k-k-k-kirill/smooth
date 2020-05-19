import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, Reducer, Store, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import authState from './store/reducers/auth/types'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/saga/rootSaga'

//Reducers
import authReducer from './store/reducers/auth/auth'

export interface ApplicationState {
  auth: authState
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  auth: authReducer
})

const saga = createSagaMiddleware()

const store: Store<any> = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(saga)
))

saga.run(rootSaga)

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
