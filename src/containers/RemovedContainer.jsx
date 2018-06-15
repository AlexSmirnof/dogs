import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { restoreDogAction, viewAction } from '../redux/actions';
import { removedDataSelector } from '../redux/selectors';



const mapStateToProps = state => ({
    data:removedDataSelector(state)
})

export default connect(mapStateToProps, { restoreDogAction, viewAction })(Grid);

