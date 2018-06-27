import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import LazyScrollHOC from '../components/LazyScrollHOC/LazyScrollHOC';
import { searchDataSelector, favoritesSelector, searchSelector } from '../redux/selectors';
import { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction, sagaFetchMoreDogsAction } from '../redux/actions';


const mapStateToProps = state => ({
    data: searchDataSelector(state),
    favorites: favoritesSelector(state),
    search: searchSelector(state)
})

export default connect(
    mapStateToProps, 
    { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction, sagaFetchMoreDogsAction }
)(LazyScrollHOC(Grid));

