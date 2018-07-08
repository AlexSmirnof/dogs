import * as R from 'ramda';
import api from "../api/api";
import { createAction } from 'redux-actions';
import {  call, put, select, take, takeLatest, takeEvery, spawn } from 'redux-saga/effects';
import { fetchDogAction, fetchBreedAction, fetchBreedsAction, SAGA_FETCH_BREED, fetchMoreDogsAction, SAGA_FETCH_MORE_DOGS, SHOW_MESSAGE  } from '../redux/actions';



export function* randomDogsSaga(limit = 40){
    const {random} =  yield select(state => state.dogs.data);
    if (R.isNil(random) || R.isEmpty(random)){
        for(let i = 0; i < limit; i++){
            try {
                const {data: {status, message: url} = {}} = yield call(api.fetchOne);      
                if (status && status === 'success') {
                    yield put(fetchDogAction({key:'random',url}));
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
                yield put(fetchBreedsAction(breeds));
            } 
        }
    } catch (error){
        yield spawn(showMessageSaga, `Fetch breeds failed!`);
        console.log(error);
    }

}
export function* fetchBreedWatcher(){
    yield takeLatest(SAGA_FETCH_BREED, fetchBreedSaga);
}
export function* fetchBreedSaga({payload: breed = ''}){
    try {
        const {data} = yield select(state => state.dogs);
        if(R.isNil(data[breed]) || R.isEmpty(data[breed])){
            const {data: {status, message: urls}} = yield call(api.fetchByBreed, breed);      
            if (status && status === 'success') {
                yield put(fetchBreedAction({breed,urls}));
                yield spawn(showMessageSaga, `Fetched ${urls.length} dogs!`);
            } 
        }
    } catch(error){
        yield spawn(showMessageSaga, `Fetch ${breed} failed!`);
        console.log(error);
    }
}

export function* fetchMoreDogsWatcher(){
    yield takeEvery(SAGA_FETCH_MORE_DOGS, fetchMoreDogs);
}
export function* fetchMoreDogs({payload: size = 1}){
    try {
        const results = yield call(api.fetchMore, size);    
        const data = results
            .filter(({data:{status}={}}) => status && status === 'success')
            .map(({data:{message}})=>message);           
        yield put(fetchMoreDogsAction(data));
    } catch (error) {
        yield spawn(showMessageSaga, `Fetch more failed!`);
        console.log(error);
    }
}

function* showMessageSaga(message) {
    yield put(createAction(SHOW_MESSAGE)({message}));
}