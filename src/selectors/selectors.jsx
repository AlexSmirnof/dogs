import { createSelector } from 'reselect';


export const matchSelector = (state, props) => props.match;
export const paramsSelector = createSelector(
    matchSelector,
    match => match.params
)
export const routerSelector = state => state.router;
export const pathnameSelector = createSelector(
    routerSelector,
    router => router.location && router.location.pathname
) 


export const userSelector = state => state.user;
export const favoritesSelector = createSelector (
    userSelector,
    user => user.favorites
)
export const removedSelector = createSelector (
    userSelector,
    user => user.removed
)
export const historySelector = createSelector (
    userSelector,
    user => user.history
)
export const settingsSelector = createSelector (
    userSelector,
    user => user.settings
)
export const searchSelector = createSelector (
    userSelector,
    user => user.search
)
export const messageSelector =  createSelector (
    userSelector,
    user => user.message
)
export const favoritesDataSelector = createSelector (
    favoritesSelector,
    removedSelector,
    (favorites, removed) => Object.values(favorites).filter(({url})=>!removed[url])
)

export const dogsSelector = state => state.dogs;
export const breedsSelector = createSelector (
    dogsSelector,
    dogs => dogs.breeds
)
export const breedsArraySelector = createSelector (
    breedsSelector,
    breeds => Object.keys(breeds).map(breed=>({breed,subBreeds:breeds[breed]}))
)
export const dogsDataSelector = createSelector (
    dogsSelector,
    dogs => dogs.data
)
export const randomDogsSelector = createSelector (
    dogsDataSelector,
    data => data.random
)
export const searchDataSelector = createSelector (
    removedSelector,
    searchSelector,
    randomDogsSelector,
    dogsDataSelector,
    (removed, search, randomDogs, data) => {
        search = search.trim();
        if (search.length > 0){
            return data[search] ? data[search].filter(({url}) => !removed[url]) : []
        } else {
            return randomDogs ? randomDogs.filter(({url}) => !removed[url]) : []
        }

    }
)
export const galleryhDataSelector = createSelector (
    paramsSelector,
    removedSelector,
    dogsDataSelector,
    (params, removed, data) => params.breed && data[params.breed] ? data[params.breed].filter(({url})=>!removed[url]) : []
)






