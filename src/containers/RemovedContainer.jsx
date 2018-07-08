import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { restoreDogAction, viewAction } from '../redux/actions';
import { removedDataSelector } from '../redux/selectors';
import LazyScrollHOC from '../components/LazyScrollHOC/LazyScrollHOC';


const mapStateToProps = state => ({
    data:removedDataSelector(state)
})

export default connect(mapStateToProps, { restoreDogAction, viewAction })(LazyScrollHOC(Grid));

