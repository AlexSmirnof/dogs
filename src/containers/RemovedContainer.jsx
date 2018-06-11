import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { addFavorite, removeFavorite, restoreDog } from '../actions/user';


const mapStateToProps = ({user}) => ({
    data: Object.values(user.removed),
})

export default connect(mapStateToProps,{ restoreDog })(Grid);

