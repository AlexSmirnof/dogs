import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { searchDataSelector, favoritesSelector } from '../selectors/selectors';
import { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction } from '../actions/actions';


const mapStateToProps = state => ({
    data: searchDataSelector(state),
    favorites: favoritesSelector(state)
})

export default connect(mapStateToProps, { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction })(Grid);

