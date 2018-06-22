import {  fork, all } from 'redux-saga/effects';
import { signInWatcher,authenticateRouteWatcher,signOutWatcher,forwardRouteWatcher,historyWatcher,searchWatcher } from './userSaga'
import { randomDogsSaga, fetchBreedsSaga, fetchBreedWatcher, fetchMoreDogsWatcher } from './dogsSaga';


export default function* rootSaga() {

    yield all([ 
        fork(fetchBreedsSaga), 
        fork(historyWatcher),
        fork(searchWatcher),
        fork(fetchMoreDogsWatcher),
        signInWatcher(),
        authenticateRouteWatcher(),
        forwardRouteWatcher(),
        fetchBreedWatcher(),   
        signOutWatcher()
    ]);
}


