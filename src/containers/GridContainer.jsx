import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import LazyScrollHOC from '../components/LazyScrollHOC/LazyScrollHOC';
import { searchDataSelector, favoritesSelector, searchSelector } from '../redux/selectors';
import { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction, sagaFetchMoreDogsAction, sagaFetchBreedAction as fetchBreed, forwardRouteAction as forwardBreed } from '../redux/actions';


// const forwardBreed = breed => {
//     console.log(breed);
//     // sagaFetchBreedAction(breed);
//     forwardRouteAction(`/gallery/${breed}`);
//     // breed && sagaFetchBreedAction(breed);
//     // breed && forwardRouteAction(`gallery/${breed}`)
// }

const mapStateToProps = state => ({
    data: searchDataSelector(state),
    favorites: favoritesSelector(state),
    search: searchSelector(state)
})

export default connect(
    mapStateToProps, 
    { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction, sagaFetchMoreDogsAction, fetchBreed, forwardBreed }
)(LazyScrollHOC(Grid));

