import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from '../components/View/View';
import Grid from '../components/Grid/Grid';
import { BreedsList } from '../components/BreedsList/BreedsList';
import { forwardRoute, addFavorite, removeFavorite, removeDog, viewAction } from '../actions/user';
import { fetchBreed } from '../actions/dogs';


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
            const dogs = data[match.params.breed] ? data[match.params.breed].filter(({url})=>!removed[url]) : [];
            return (
                <div>
                {
                    slides &&
                    <View
                        autoplay={autoplay}
                        data={dogs} 
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
                        data={dogs} 
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

const mapStateToProps = ({user:{settings, favorites, removed}, dogs:{breeds,data}}) => ({
    settings,
    favorites,
    removed,
    breeds:Object.keys(breeds).map(breed=>({breed,subBreeds:breeds[breed]})),
    data
})

export default connect(mapStateToProps, { viewAction, forwardRoute, fetchBreed, addFavorite, removeFavorite, removeDog })(GalleryContainer);

