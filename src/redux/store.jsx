import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from './reducers';
import { persistState, replaceReducers } from './middlewares';


const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routedReducers = combineReducers({
  ...reducers,
  router: routerReducer
})
const getInitialState = key => {
    if(localStorage && key){
      const rehydrated = localStorage.getItem(key);
      return rehydrated ? JSON.parse(rehydrated) : {};
    }
    return {};
}



export default (initialState = getInitialState('dogs:state')) => {

    const store = createStore(routedReducers, initialState, 
      composeWithDevTools(applyMiddleware( logger, replaceReducers, persistState, sagaMiddleware, routerMiddleware(history))));

    sagaMiddleware.run(rootSaga);
    
    return { store, history };
}



