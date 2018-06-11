import {Types as T} from '../actions/types';


export default function(state = {breeds:{},data:{}}, {type, payload}) {
    switch(type){
        case T.FETCH_DOG: 
            const prevKey = state.data[payload.key] || [];
            return {...state, data: {...state.data,[payload.key]:[...prevKey,payload.dog]}}; 
        case T.FETCH_BREED: 
            return {...state, data: {...state.data,[payload.breed]:payload.dogs }};   
        case T.FETCH_BREEDS: 
            return {...state, breeds: {...state.breeds, ...payload.breeds}};              
 
    }
    return state;
}
