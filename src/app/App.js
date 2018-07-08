import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Store from '../redux/store';
import AuthRoute from '../components/AuthRoute/AuthRoute';
import { ConnectedRouter } from 'react-router-redux';
// import AsyncComponent from '../components/AsyncComponent/AsyncComponent';
import './css/App.css';

const { store, persistor, history } = Store();

// const DynamicMain = AsyncComponent(import(/* webpackChunkName: "main", webpackPrefetch:10 */'../layouts/Main'));
const DynamicMain = Loadable({
  loader: () => import(/* webpackChunkName: "mainlayout" */'../layouts/Main'),
  loading: () => <div>Dynamic Main...</div>,
});
const DynamicSignForm = Loadable({
  loader: () => import(/* webpackChunkName: "signform" */'../containers/SignFormContainer'),
  loading: () => <div>Dynamic SignForm...</div>,
});


const App = () => (

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MuiThemeProvider>
            <ConnectedRouter history={history} >
              <Switch>
                <Route path='/sign' component={DynamicSignForm}/>
                <AuthRoute path='/' component={DynamicMain}/>
              </Switch>
            </ConnectedRouter>  
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
)

export default App;
