import { SagaTypes as S, Types as T } from './types';


export function signIn(username){
    return {
        type: S.SAGA_SIGN_IN,
        payload: username
    }
}
export function signOut(){
    return {
        type: S.SAGA_SIGN_OUT
    }
}
export function authenticateUser(params){
    return {
        type: S.SAGA_AUTHENTICATE_USER,
        payload:{...params}
    }
}
export function forwardRoute(pathname){
    return {
        type: S.SAGA_FORWARD_ROUTE,
        payload: {pathname}
    }
}
export function clearMessage(){
    return {
        type: T.SHOW_MESSAGE,
        payload: {message: null}
    }
}
export function addFavorite(dog){
    return {
        type: T.ADD_FAVORITE,
        payload: {...dog}
    }
}
export function removeFavorite({url}){
    return {
        type: T.REMOVE_FAVORITE,
        payload: {url}
    }
}
export function removeDog(dog){
    return {
        type: T.REMOVE,
        payload: dog
    }
}
export function restoreDog({url}){
    return {
        type: T.RESTORE,
        payload: {url}
    }
}
export function setSettings(settings){
    return {
        type: T.SETTINGS,
        payload: {settings}
    }
}
export function searchAction(query){
    return {
        type: S.SAGA_SEARCH,
        payload: {query}
    }
}
export function viewAction(dog){
    return {
        type: T.VIEW,
        payload: dog
    }
}