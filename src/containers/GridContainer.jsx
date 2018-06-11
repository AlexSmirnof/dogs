import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { addFavorite, removeFavorite } from '../actions/user';
import { removeDog } from '../actions/user';
import { searchDataSelector, favoritesSelector } from '../selectors/selectors';



const mapStateToProps = state => ({
    data: searchDataSelector(state),
    favorites: favoritesSelector(state)
})

export default connect(mapStateToProps, { addFavorite, removeFavorite, removeDog })(Grid);

