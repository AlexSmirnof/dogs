import React from 'react';
import { connect } from 'react-redux';
import View from '../components/View/View';
import Grid from '../components/Grid/Grid';
import { removeFavoriteAction, removeDogAction, viewAction } from '../redux/actions';
import { favoritesSelector, settingsSelector, removedSelector, favoritesDataSelector } from '../redux/selectors';
import LazyScrollHOC from '../components/LazyScrollHOC/LazyScrollHOC';


const LazyGrid = LazyScrollHOC(Grid);

const FavoritesContainer = ({ 
    settings:{grid,slides,autoplay}, 
    data, 
    favorites, 
    addFavoriteAction, 
    removeFavoriteAction, 
    removeDogAction, 
    viewAction }) => (
        <div>
            {
                slides &&
                <View
                    autoplay={autoplay}
                    data={data} 
                    favorites={favorites}
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
                    removeFavoriteAction={removeFavoriteAction}
                    removeDogAction={removeDogAction} 
                    viewAction={viewAction}
                    />  
            }  
        </div>
    )


const mapStateToProps = state => ({
    removed: removedSelector(state),
    settings: settingsSelector(state),
    data: favoritesDataSelector(state),
    favorites: favoritesSelector(state)
})

export default connect(mapStateToProps,{ removeFavoriteAction, removeDogAction, viewAction })(FavoritesContainer);

