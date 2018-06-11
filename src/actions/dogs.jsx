import { Types as T, SagaTypes as S } from './types';
import { extractBreed, extractSubBreed } from '../utils/utils';

export function createDog({key,url}){
    return {
        type: T.FETCH_DOG,
        payload: {
            key,
            dog:{url,breed: extractBreed(url)}
        }
    }
}
export function createBreed({breed,urls}){
    return {
        type: T.FETCH_BREED,
        payload: {
            breed,
            dogs:urls.map(url => ({url,breed:extractBreed(url)}))
        }
    }
}

export function createBreeds(breeds){
    return {
        type: T.FETCH_BREEDS,
        payload: {breeds}
    }
}

export function fetchBreed(breed){
    return {
        type: S.SAGA_FETCH_BREED,
        payload:{breed}
    }
}