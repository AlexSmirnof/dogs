import * as R from 'ramda';
import AuthManager from '../auth/auth';
import { push } from 'react-router-redux';
import { createAction } from 'redux-actions';
import {  call, put, take, select, takeLatest, fork, spawn, actionChannel } from 'redux-saga/effects';
import { randomDogsSaga, fetchBreedSaga } from './dogsSaga';
import { extractBreed, hasBreed } from '../utils/utils';
import * as A from '../redux/actions';
 

export function* signInWatcher() {
    yield takeLatest(A.SAGA_SIGN_IN, signInSaga);
}
function* signInSaga({payload:username}) {
    try {
        const user = yield call([AuthManager,AuthManager.signInUser], username);
        console.log("USER", user)
        yield put(createAction(A.SIGN_IN)(user));
        const  { cachedRedirect = `/` } = yield select(state => state.router.location);
        yield put(push({pathname:cachedRedirect}));
        yield spawn (randomDogsSaga);
        yield spawn(showMessageSaga, `Signed in successful!`);        
    } catch (error) {
        yield spawn(showMessageSaga, `Sorry, something go wrong!`);
        console.log(error);
    }
}

export function* authenticateRouteWatcher(){
    yield takeLatest(A.SAGA_AUTHENTICATE_USER,authenticateUserSaga);
}
function* authenticateUserSaga({payload:{roles,cachedRedirect=`/`}}){
    try {
        const user = yield select(state => state.user || {});
        if( !AuthManager.authenticate(user) && !AuthManager.authorize(user,roles)){
            yield put(push({pathname:'/sign', cachedRedirect})) ;
        }
    } catch(error) {
        yield spawn(showMessageSaga, `Sorry, something go wrong!`);
        console.log(error);
    }
}

export function* signOutWatcher(){
    yield takeLatest(A.SAGA_SIGN_OUT, signOutSaga);
}
function* signOutSaga(){
    try {
        const user = yield select(state => state.user || {});
        AuthManager.signOutUser(user);
        yield put(createAction(A.SIGN_OUT)({}));
        yield put(push({pathname:'/'}));
        yield spawn(showMessageSaga, `Sign out successful!`); 
    } catch(error) {
        yield spawn(showMessageSaga, `Sorry, something go wrong!`);
        console.log(error);
    }
}

export function* forwardRouteWatcher(){
    yield takeLatest(A.SAGA_FORWARD_ROUTE,forwardRouteSaga);
}
function* forwardRouteSaga({payload: pathname = '/'}){
    try {
        yield put(push({pathname})) ;
    } catch(error) {
        yield spawn(showMessageSaga, `Sorry, something go wrong!`);
        console.log(error);
    }
}

export function* historyWatcher(){
    const channel = yield actionChannel([A.ADD_FAVORITE,A.REMOVE_FAVORITE,A.REMOVE,A.RESTORE,A.VIEW]);
    while(true){
        try {
            const {type,payload:{url}} = yield take(channel);
            yield put(createAction(A.HISTORY)({type,url,breed:extractBreed(url)}));
        } catch (error){
            yield spawn(showMessageSaga, `Sorry, create history failed!`);
            console.log(error);
        }
    }
}

export function* searchWatcher() {
    yield takeLatest(A.SAGA_SEARCH, searchSaga);
}
function* searchSaga({payload = ''}){
    try{
        const query = payload.trim();
        const breed = query.trim().split(/[- ]+/).map(s=>s.trim()).join('-');
        const {breeds, data} = yield select(state => state.dogs);
        if(hasBreed(breeds, breed)){
            yield fork(fetchBreedSaga,{payload:breed});
            yield put(createAction(A.SEARCH)(breed));
        } 
        else if (query === '') {
            yield put(createAction(A.SEARCH)(''));
        }
        else {
            yield put(createAction(A.SEARCH)(query));
            yield spawn(showMessageSaga, `${query} not found.`);
        }
    } catch(error) {
        yield spawn(showMessageSaga, `Seach ${payload.trim()} failed.`);
        console.log(error);
    }
}

export function* showMessageSaga(message) {
    yield put(createAction(A.SHOW_MESSAGE)({message}));
}