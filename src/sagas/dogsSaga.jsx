import * as R from 'ramda';
import api from "../api/api";
import {  call, put, select, take, takeLatest, spawn } from 'redux-saga/effects';
import { Types as T, SagaTypes as S } from '../actions/types';
import { createDog, createBreed, createBreeds } from '../actions/dogs';


export function* randomDogsSaga(limit = 20){

    const {random} =  yield select(state => state.dogs.data);
    if (R.isNil(random) || R.isEmpty(random)){
        for(let i = 0; i < limit; i++){
            try {
                const {data: {status, message: url} = {}} = yield call(api.fetchOne);      
                if (status && status === 'success') {
                    yield put(createDog({key:'random',url}));
                } 
            } catch (error) {
                yield spawn(showMessageSaga, `Fetch random failed!`);
                console.log(error);
                i--;
            }
        }
    }
}
export function* fetchBreedsSaga(){
    const {payload: {dogs: {breeds} = {}} = {}} = yield take("persist/REHYDRATE");
    try {
        if (R.isNil(breeds) || R.isEmpty(breeds)) {
            const { data: {status, message: breeds} = {}} = yield call(api.fetchBreeds)
            if (status && status === 'success') {
                yield put(createBreeds(breeds));
            } 
        }
    } catch (error){
        yield spawn(showMessageSaga, `Fetch breeds failed!`);
        console.log(error);
    }

}
export function* fetchBreedWatcher(){
    yield takeLatest(S.SAGA_FETCH_BREED, fetchBreedSaga);
}
export function* fetchBreedSaga({payload:{breed}}){
    try {
        const {data} = yield select(state => state.dogs);
        if(R.isNil(data[breed]) || R.isEmpty(data[breed])){
            const {data: {status, message: urls}} = yield call(api.fetchByBreed, breed);      
            if (status && status === 'success') {
                yield put(createBreed({breed,urls}));
                yield spawn(showMessageSaga, `Fetched ${urls.length} dogs!`);
            } 
        }
    } catch(error){
        yield spawn(showMessageSaga, `Fetch breed failed!`);
        console.log(error);
    }
}


function* showMessageSaga(message) {
    yield put({type: T.SHOW_MESSAGE, payload:{message}});
}