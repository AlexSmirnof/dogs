import React from 'react';
import { connect } from 'react-redux';
import Grid from '../components/Grid/Grid';
import { addFavorite, removeFavorite } from '../actions/user';
import { removeDog } from '../actions/user';

const findData = (data, removed, search) => {
    return data[search] ? data[search].filter(dog => !removed[dog.url]) : [];
    
}


const mapStateToProps = ({user:{search = '',favorites,removed}, dogs:{data}}) => ({
    data: search.trim().length > 0 ? findData(data, removed, search.trim()) : findData(data, removed, 'random'),
    favorites
})

export default connect(mapStateToProps,{ addFavorite, removeFavorite, removeDog })(Grid);

