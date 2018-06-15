import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { searchDataSelector, favoritesSelector } from '../redux/selectors';
import { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction } from '../redux/actions';


const mapStateToProps = state => ({
    data: searchDataSelector(state),
    favorites: favoritesSelector(state)
})

export default connect(mapStateToProps, { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction })(Grid);

