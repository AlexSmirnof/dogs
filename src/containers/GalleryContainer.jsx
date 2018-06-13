import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from '../components/View/View';
import Grid from '../components/Grid/Grid';
import { BreedsList } from '../components/BreedsList/BreedsList';
import { forwardRouteAction, addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction, sagaFetchBreedAction } from '../actions/actions';
import { settingsSelector, favoritesSelector, removedSelector,  galleryhDataSelector, breedsArraySelector } from '../selectors/selectors';


class GalleryContainer extends Component {

    onBreed = (breed) => {
        this.props.sagaFetchBreedAction(breed);
        this.props.forwardRouteAction(`${this.props.match.url}/${breed}`);
    }
    onSubBreed = (fullBreed) => {
        this.props.sagaFetchBreedAction(fullBreed);        
        this.props.forwardRouteAction(`${this.props.match.url}/${fullBreed}`);
    }    

    render(){
        const { settings: {grid,slides,autoplay}={}, data, breeds, favorites, removed, match } = this.props;
        const { addFavoriteAction, removeFavoriteAction, removeDogAction, viewAction } = this.props;
        if (match.params.breed){
            return (
                <div>
                {
                    slides &&
                    <View
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
                    <Grid 
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
                onSubBreed={this.onSubBreed}
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

