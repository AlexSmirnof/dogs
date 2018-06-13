import { createAction } from 'redux-actions';
import { extractBreed, extractSubBreed } from '../utils/utils';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const HISTORY = 'HISTORY';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const RESTORE = 'RESTORE';
const REMOVE = 'REMOVE';
const SETTINGS = 'SETTINGS';
const SEARCH = 'SEARCH';
const FETCH_DOG = 'FETCH_DOG';
const FETCH_BREED = 'FETCH_BREED';
const FETCH_BREEDS = 'FETCH_BREEDS';
const VIEW = 'VIEW';
const SHOW_MESSAGE = 'SHOW_MESSAGE';

export const viewAction = createAction(VIEW);
export const removeDogAction = createAction(REMOVE);
export const restoreDogAction = createAction(RESTORE);
export const setSettingsAction = createAction(SETTINGS);
export const fetchBreedsAction = createAction(FETCH_BREEDS);
export const addFavoriteAction = createAction(ADD_FAVORITE);
export const removeFavoriteAction = createAction(REMOVE_FAVORITE);
export const clearMessageAction = createAction(SHOW_MESSAGE, _ => {message: null});
export const fetchDogAction = createAction(FETCH_DOG, ({key,url}) => ({key, dog:{url, breed: extractBreed(url)}}));
export const fetchBreedAction = createAction(FETCH_BREED, ({breed,urls}) => ({breed, dogs:urls.map(url => ({url,breed:extractBreed(url)}))}));


const SAGA_SIGN_IN = 'SAGA_SIGN_IN';
const SAGA_SIGN_OUT = 'SAGA_SIGN_OUT';
const SAGA_AUTHENTICATE_USER = 'SAGA_AUTHENTICATE_USER';
const SAGA_FORWARD_ROUTE = 'SAGA_FORWARD_ROUTE';
const SAGA_ADD_FAVORITE = 'SAGA_ADD_FAVORITE';
const SAGA_REMOVE_FAVORITE = 'SAGA_REMOVE_FAVORITE';
const SAGA_SEARCH = 'SAGA_SEARCH';
const SAGA_FETCH_DOG = 'SAGA_FETCH_DOG';
const SAGA_FETCH_BREED = 'SAGA_FETCH_BREED';
const SAGA_FETCH_BREEDS = 'SAGA_FETCH_BREEDS';

export const searchAction = createAction(SAGA_SEARCH);
export const signInAction = createAction(SAGA_SIGN_IN);
export const signOutAction = createAction(SAGA_SIGN_OUT);
export const sagaFetchBreedAction = createAction(SAGA_FETCH_BREED);
export const forwardRouteAction = createAction(SAGA_FORWARD_ROUTE);
export const authenticateUserAction = createAction(SAGA_AUTHENTICATE_USER);









