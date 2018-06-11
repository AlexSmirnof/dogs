import {Types as T} from '../actions/types';


export default function (state = {}, {type, payload}) {
    switch(type){
        case T.SIGN_IN: 
            return {...payload};
        case T.SIGN_OUT:
            return {};
        case T.SHOW_MESSAGE:
            return { ...state, message: payload.message};
        case T.ADD_FAVORITE:
            return {...state, favorites: {...state.favorites, [payload.url]:payload}};    
        case T.REMOVE_FAVORITE:
            const { [payload.url]:removed, ...rest} = state.favorites;
            return {...state, favorites: {...rest}}; 
        case T.SETTINGS:
            return {...state, settings: payload.settings};    
        case T.SEARCH:
            return {...state, search: payload.search};       
        case T.RESTORE:
            const { [payload.url]:restored, ...rests} = state.removed;
            return {...state, removed: {...rests}};    
        case T.REMOVE:
            return {...state, removed: {...state.removed, [payload.url]:payload}};  
        case T.HISTORY:
            return {...state, history: [...state.history,payload]}      
    }
    return state;
}