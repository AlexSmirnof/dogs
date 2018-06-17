import { handleActions } from 'redux-actions';
import * as A from './actions';

export const dogs =  handleActions(
{
    [A.fetchDogAction]: (state, {payload}) => {
        const prevKey = state.data[payload.key] || [];
        return {...state, data: {...state.data,[payload.key]:[...prevKey,payload.dog]}}; 
    },
    [A.fetchBreedAction]: (state, {payload}) => {
        return {...state, data: {...state.data,[payload.breed]:payload.dogs }};   
    },
    [A.fetchBreedsAction]: (state, {payload}) => {
        return {...state, breeds: {...state.breeds, ...payload}};              
    }
}, 
{data:{},breeds:{}});


export const user = handleActions({
    [A.SIGN_IN]: (_, {payload}) => ({...payload}),
    [A.signOutAction]: () => ({}),
    [A.SHOW_MESSAGE]: (state, {payload}) => {
        return {...state, message: payload ? payload.message: null};
    },
    [A.addFavoriteAction]: (state, {payload}) => {
        return {...state, favorites: {...state.favorites, [payload.url]:payload}};
    },
    [A.removeFavoriteAction]: (state, {payload}) => {
        const { [payload.url]:removed, ...rest} = state.favorites;
        return {...state, favorites: {...rest}}; 
    },
    [A.setSettingsAction]: (state, {payload}) => {
        return {...state, settings: payload};            
    },
    [A.searchAction]: (state, {payload}) => {
        return {...state, search: payload};               
    },
    [A.restoreDogAction]: (state, {payload}) => {
        const { [payload.url]:restored, ...rests} = state.removed;
        return {...state, removed: {...rests}};    
    },
    [A.removeDogAction]: (state, {payload}) => {
        return {...state, removed: {...state.removed, [payload.url]:payload}};          
    },
    [A.HISTORY]: (state, {payload}) => {
        return {...state, history: [payload,...state.history]}              
    }
}, {});