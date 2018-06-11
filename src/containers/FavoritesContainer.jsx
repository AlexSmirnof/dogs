import React from 'react';
import { connect } from 'react-redux';
import View from '../components/View/View';
import Grid from '../components/Grid/Grid';
import { addFavorite, removeFavorite } from '../actions/user';
import { removeDog } from '../actions/user';
import { favoritesSelector, settingsSelector, removedSelector, favoritesDataSelector } from '../selectors/selectors';


const FavoritesContainer = ({settings:{grid,slides,autoplay}, data, favorites, addFavorite, removeFavorite, removeDog, viewAction }) => (
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


const mapStateToProps = state => ({
    settings: settingsSelector(state),
    data: favoritesDataSelector(state),
    favorites: favoritesSelector(state),
    removed: removedSelector(state)
})

export default connect(mapStateToProps,{ addFavorite, removeFavorite, removeDog })(FavoritesContainer);

