import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '../components/Grid/Grid';
import AuthRoute from '../components/AuthRoute/AuthRoute';
import AppbarContainer from '../containers/AppbarContainer';


const Routes = {
    index:'/',
    gallery:'/gallery/:breed?',
    favorites:'/favorites',
    trash:'/trash',
    history:'/history',
    signin:'/signin',
    admin: '/admin'
}

const DynamicGrid = Loadable({
    loader: () => import(/* webpackChunkName: "grid" */'../containers/GridContainer'),
    loading: () => <div>Dynamic Grid...</div>,
});
const DynamicGallery = Loadable({
    loader: () => import(/* webpackChunkName: "gallery" */'../containers/GalleryContainer'),
    loading: () => <div>Dynamic Gallery...</div>,
});
const DynamicFavorites = Loadable({
    loader: () => import(/* webpackChunkName: "favorites" */'../containers/FavoritesContainer'),
    loading: () => <div>Dynamic Favorites...</div>,
});
const DynamicRemoved = Loadable({
    loader: () => import(/* webpackChunkName: "removed" */'../containers/RemovedContainer'),
    loading: () => <div>Dynamic Removed...</div>,
});
const DynamicHistory = Loadable({
    loader: () => import(/* webpackChunkName: "history" */'../containers/HistoryContainer'),
    loading: () => <div>Dynamic History...</div>,
});


const Main = () => (
    <div>
        <AppbarContainer/>  
        <Switch>          
            <Route exact path={Routes.index} component={DynamicGrid}/>
            <Route path={Routes.gallery} component={DynamicGallery}/>
            <Route path={Routes.favorites} component={DynamicFavorites}/>
            <Route path={Routes.trash} component={DynamicRemoved}/>
            <Route path={Routes.history} component={DynamicHistory}/>
            <AuthRoute path={Routes.admin} roles={'admin'}component={<div>Admin</div>}/>
            <Route render={() => <Redirect to={Routes.index}/>}/> 
        </Switch>
    </div>
)

export default Main;