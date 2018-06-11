import { createSelector } from 'reselect';


const userSelector = state => state.user;
const favoritesSelector = state => state.user.favorites;
const removedSelector = state => state.user.removed;
const historySelector = state => state.user.history;
const settingsSelector = state => state.user.settings;
const searchSelector = state => state.user.search; 
const messageSelector = state => state.user.message;

const dogsSelector = state => state.dogs;
const breedsSelector = state => state.dogs.breeds;
const randomDogsSelector = state => state.dogs.random;

const matchSelector = state => state.match;





