import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { addFavorite, removeFavorite, restoreDog } from '../actions/user';
import { removedSelector } from '../selectors/selectors';


const mapStateToProps = state => ({
    data: Object.values(removedSelector(state)),
})

export default connect(mapStateToProps,{ restoreDog })(Grid);

