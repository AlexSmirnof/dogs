import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { restoreDogAction, viewAction } from '../actions/actions';
import { removedDataSelector } from '../selectors/selectors';



const mapStateToProps = state => ({
    data:removedDataSelector(state)
})

export default connect(mapStateToProps, { restoreDogAction, viewAction })(Grid);

