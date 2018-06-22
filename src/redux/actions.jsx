import { createAction } from 'redux-actions';
import { extractBreed, extractSubBreed } from '../utils/utils';

export const FETCH_MORE_DOGS = 'FETCH_MORE_DOGS';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const SIGN_IN = 'SIGN_IN';
export const HISTORY = 'HISTORY';
export const SEARCH = 'SEARCH';
export const SIGN_OUT = 'SIGN_OUT';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const RESTORE = 'RESTORE';
export const REMOVE = 'REMOVE';
export const VIEW = 'VIEW';
const SETTINGS = 'SETTINGS';
const FETCH_DOG = 'FETCH_DOG';
const FETCH_BREED = 'FETCH_BREED';
const FETCH_BREEDS = 'FETCH_BREEDS';



export const viewAction = createAction(VIEW);
export const removeDogAction = createAction(REMOVE);
export const restoreDogAction = createAction(RESTORE);
export const setSettingsAction = createAction(SETTINGS);
export const fetchBreedsAction = createAction(FETCH_BREEDS);
export const addFavoriteAction = createAction(ADD_FAVORITE);
export const removeFavoriteAction = createAction(REMOVE_FAVORITE);
export const clearMessageAction = createAction(SHOW_MESSAGE);
export const fetchDogAction = createAction(FETCH_DOG, ({key,url}) => ({key, dog:{url, breed: extractBreed(url)}}));
export const fetchMoreDogsAction = createAction(FETCH_MORE_DOGS, urls=> urls.map(url=>({url,breed: extractBreed(url)})));
export const fetchBreedAction = createAction(FETCH_BREED, ({breed,urls}) => ({breed, dogs:urls.map(url => ({url,breed:extractBreed(url)}))}));

export const SAGA_FETCH_BREED = 'SAGA_FETCH_BREED';
export const SAGA_SEARCH = 'SAGA_SEARCH';
export const SAGA_FORWARD_ROUTE = 'SAGA_FORWARD_ROUTE';
export const SAGA_SIGN_OUT = 'SAGA_SIGN_OUT';
export const SAGA_AUTHENTICATE_USER = 'SAGA_AUTHENTICATE_USER';
export const SAGA_SIGN_IN = 'SAGA_SIGN_IN';
const SAGA_ADD_FAVORITE = 'SAGA_ADD_FAVORITE';
const SAGA_REMOVE_FAVORITE = 'SAGA_REMOVE_FAVORITE';
export const SAGA_FETCH_MORE_DOGS = 'SAGA_FETCH_MORE_DOGS';
const SAGA_FETCH_DOG = 'SAGA_FETCH_DOG';
const SAGA_FETCH_BREEDS = 'SAGA_FETCH_BREEDS';

export const searchAction = createAction(SAGA_SEARCH);
export const signInAction = createAction(SAGA_SIGN_IN);
export const signOutAction = createAction(SAGA_SIGN_OUT);
export const sagaFetchMoreDogsAction = createAction(SAGA_FETCH_MORE_DOGS);
export const sagaFetchBreedAction = createAction(SAGA_FETCH_BREED);
export const forwardRouteAction = createAction(SAGA_FORWARD_ROUTE);
export const authenticateUserAction = createAction(SAGA_AUTHENTICATE_USER);









