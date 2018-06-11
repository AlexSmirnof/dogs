import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '../components/Grid/Grid';
import AuthRoute from '../components/AuthRoute/AuthRoute';
import AppbarContainer from '../containers/AppbarContainer';
import GridContainer from '../containers/GridContainer';
import GalleryContainer from '../containers/GalleryContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import RemovedContainer from '../containers/RemovedContainer';
import HistoryContainer from '../containers/HistoryContainer';


const Routes = {
    index:'/',
    gallery:'/gallery/:breed?',
    favorites:'/favorites',
    trash:'/trash',
    history:'/history',
    signin:'/signin',
    admin: '/admin'
}


const Main = () => (
    <div>
        <AppbarContainer/>  
        <Switch>          
            <Route exact path={Routes.index} component={GridContainer}/>
            <Route path={Routes.gallery} component={GalleryContainer}/>
            <Route path={Routes.favorites} component={FavoritesContainer}/>
            <Route path={Routes.trash} component={RemovedContainer}/>
            <Route path={Routes.history} component={HistoryContainer}/>
            <AuthRoute path={Routes.admin} roles={'admin'}component={<div>Admin</div>}/>
            <Route render={() => <Redirect to={Routes.index}/>}/> 
        </Switch>

    </div>
)

export default Main;