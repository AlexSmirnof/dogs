import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from '../components/View/View';
import Grid from '../components/Grid/Grid';
import { BreedsList } from '../components/BreedsList/BreedsList';
import { forwardRouteAction, addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction, sagaFetchBreedAction } from '../redux/actions';
import { settingsSelector, favoritesSelector, removedSelector,  galleryhDataSelector, breedsArraySelector } from '../redux/selectors';
import LazyScrollHOC from '../components/LazyScrollHOC/LazyScrollHOC';
import AutoplayHOC from '../components/AutoplayHOC/AutoplayHOC';


const LazyGrid = LazyScrollHOC(Grid);
const AutoplayView = AutoplayHOC(View);

class GalleryContainer extends Component {

    onBreed = (breed) => {
        this.props.sagaFetchBreedAction(breed);
        this.props.forwardRouteAction(`${this.props.match.url}/${breed}`);
    }

    render(){
        const { settings: {grid,slides,autoplay}={}, data, breeds, favorites, match } = this.props;
        const { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction } = this.props;
        if (match.params.breed){
            return (
                <div>
                {
                    slides &&
                    <AutoplayView
                        autoplay={autoplay}
                        data={data} 
                        favorites={favorites}
                        addFavoriteAction={addFavoriteAction} 
                        removeFavoriteAction={removeFavoriteAction}
                        removeDogAction={removeDogAction} 
                        viewAction={viewAction}
                        />
                }
                {    
                    grid &&
                    <LazyGrid 
                        data={data} 
                        favorites={favorites}
                        addFavoriteAction={addFavoriteAction} 
                        removeFavoriteAction={removeFavoriteAction}
                        removeDogAction={removeDogAction} 
                        viewAction={viewAction}
                        />  
                }  
                </div>
            )
        }
        return (
            <BreedsList 
                breeds={breeds} 
                onBreed={this.onBreed} 
                />  
        )

    }

}

const mapStateToProps = (state, props) => ({
    settings: settingsSelector(state),
    favorites: favoritesSelector(state),
    removed: removedSelector(state),
    breeds: breedsArraySelector(state),
    data: galleryhDataSelector(state, props)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    viewAction, 
    removeDogAction,
    addFavoriteAction,
    forwardRouteAction, 
    removeFavoriteAction, 
    sagaFetchBreedAction
}, 
dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);

