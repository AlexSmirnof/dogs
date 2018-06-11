import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';




export default connect(state=>({data:state.user.history}),null)(Grid);

