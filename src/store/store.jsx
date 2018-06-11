import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';// defaults to localStorage
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducers } from '../reducers';


const history = createHistory();
const persistConfig = {
    key: 'root',
    storage
}
const routedReducers = combineReducers({
  ...reducers,
  router: routerReducer
})
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, routedReducers);


export default (initialState = {}) => {

    const store = createStore(persistedReducer, initialState, 
      composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk, logger )));
    const persistor = persistStore(store);

    if (module.hot) {
        module.hot.accept(() => {
          // This fetch the new state of the above reducers.
          const nextRootReducer = require('../reducers/index')
          store.replaceReducer(
            persistReducer(persistConfig, nextRootReducer)
          )
        })
      }

    sagaMiddleware.run(rootSaga);
    
    return { store, persistor, history };
}



