import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from '../layouts/Main';
import SignFormContainer from '../containers/SignFormContainer';
import Store from '../redux/store';
import AuthRoute from '../components/AuthRoute/AuthRoute';
import { ConnectedRouter } from 'react-router-redux';
import './css/App.css';

const { store, persistor, history } = Store();


const App = () => (

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MuiThemeProvider>
            <ConnectedRouter history={history} >
              <Switch>
                <Route path='/sign' component={SignFormContainer}/>
                <AuthRoute path='/' component={Main}/>
              </Switch>
            </ConnectedRouter>  
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
)

export default App;
