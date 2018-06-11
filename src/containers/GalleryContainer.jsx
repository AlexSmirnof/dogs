import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from '../components/View/View';
import Grid from '../components/Grid/Grid';
import { BreedsList } from '../components/BreedsList/BreedsList';
import { forwardRoute, addFavorite, removeFavorite, removeDog, viewAction } from '../actions/user';
import { fetchBreed } from '../actions/dogs';
import { settingsSelector, favoritesSelector, removedSelector,  galleryhDataSelector, breedsArraySelector } from '../selectors/selectors';


class GalleryContainer extends Component {

    onBreed = (breed) => {
        this.props.fetchBreed(breed);
        this.props.forwardRoute(`${this.props.match.url}/${breed}`);
    }
    onSubBreed = (fullBreed) => {
        this.props.fetchBreed(fullBreed);        
        this.props.forwardRoute(`${this.props.match.url}/${fullBreed}`);
    }    

    render(){
        const { settings:{grid,slides,autoplay}={}, data, breeds, favorites, removed, addFavorite, removeFavorite, removeDog, viewAction, match } = this.props;
        if (match.params.breed){
            return (
                <div>
                {
                    slides &&
                    <View
                        autoplay={autoplay}
                        data={data} 
                        favorites={favorites}
                        addFavorite={addFavorite} 
                        removeFavorite={removeFavorite}
                        removeDog={removeDog} 
                        viewAction={viewAction}
                        />
                }
                {    
                    grid &&
                    <Grid 
                        data={data} 
                        favorites={favorites}
                        addFavorite={addFavorite} 
                        removeFavorite={removeFavorite}
                        removeDog={removeDog} 
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
    forwardRoute, 
    fetchBreed, 
    addFavorite,
    removeFavorite, 
    removeDog
}, 
dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);

