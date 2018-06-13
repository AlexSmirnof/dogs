import { push } from 'react-router-redux';
import {  call, put, take, select, takeLatest, fork, spawn, actionChannel } from 'redux-saga/effects';
import * as R from 'ramda';
import { Types as T, SagaTypes as S } from '../actions/types';
import AuthManager from '../auth/auth';
import { randomDogsSaga, fetchBreedSaga } from './dogsSaga';
import { extractBreed, hasBreed } from '../utils/utils';


export function* signInWatcher() {
    yield takeLatest(S.SAGA_SIGN_IN, signInSaga);
}
function* signInSaga({payload:username}) {
    try {
        const user = yield call([AuthManager,AuthManager.signInUser], username);
        yield put({type: T.SIGN_IN, payload:user});
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
    yield takeLatest(S.SAGA_AUTHENTICATE_USER,authenticateUserSaga);
}
function* authenticateUserSaga({payload:{roles,cachedRedirect=`/`}}){
    try {
        const user = yield select(state => state.user || {});
        if( !AuthManager.authenticate(user) && !AuthManager.authorize(user,roles)){
            yield put(push({pathname:'/sign',cachedRedirect})) ;
        }
    } catch(error) {
        yield spawn(showMessageSaga, `Sorry, something go wrong!`);
        console.log(error);
    }
}

export function* signOutWatcher(){
    yield takeLatest(S.SAGA_SIGN_OUT,signOutSaga);
}
function* signOutSaga(){
    try {
        const user = yield select(state => state.user || {});
        AuthManager.signOutUser(user);
        yield put({type: T.SIGN_OUT, payload:{}});
        yield put(push({pathname:'/'}));
        yield spawn(showMessageSaga, `Sign out successful!`); 
    } catch(error) {
        yield spawn(showMessageSaga, `Sorry, something go wrong!`);
        console.log(error);
    }
}

export function* forwardRouteWatcher(){
    yield takeLatest(S.SAGA_FORWARD_ROUTE,forwardRouteSaga);
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
    const channel = yield actionChannel([T.ADD_FAVORITE,T.REMOVE_FAVORITE,T.REMOVE,T.RESTORE,T.VIEW]);
    while(true){
        try {
            const {type,payload:{url}} = yield take(channel);
            yield put({type:T.HISTORY, payload:{type,url,breed:extractBreed(url)}});
        } catch (error){
            yield spawn(showMessageSaga, `Sorry, create history failed!`);
            console.log(error);
        }
    }
}

export function* searchWatcher(){
    yield takeLatest(S.SAGA_SEARCH,searchSaga);
}
function* searchSaga({payload = ''}){
    try{
        const query = payload.trim();
        const breed = query.trim().split(/[- ]+/).map(s=>s.trim()).join('-');
        const {breeds, data} = yield select(state => state.dogs);
        if(hasBreed(breeds, breed)){
            yield fork(fetchBreedSaga,{payload:breed});
            yield put({type:T.SEARCH,payload:breed});
        } 
        else if (query === '') {
            yield put({type:T.SEARCH,payload:''});
        }
        else {
            yield put({type:T.SEARCH,payload:query});
            yield spawn(showMessageSaga, `${query} not found.`);
        }
    } catch(error) {
        yield spawn(showMessageSaga, `Seach ${payload.trim()} failed.`);
        console.log(error);
    }
}

export function* showMessageSaga(message) {
    yield put({type: T.SHOW_MESSAGE, payload:{message}});
}