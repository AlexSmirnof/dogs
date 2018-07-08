import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import LazyScrollHOC from '../components/LazyScrollHOC/LazyScrollHOC';


export default connect(state => ({data: state.user.history}))(LazyScrollHOC(Grid));

