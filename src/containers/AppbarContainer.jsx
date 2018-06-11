import React, {Component} from 'react';
import { connect } from 'react-redux';
import { forwardRoute, signOut, clearMessage, setSettings, searchAction } from '../actions/user';
import Appbar from '../components/Appbar/Appbar';
import { withRouter } from 'react-router-dom';


const mapStateToProps = ({user,dogs:{breeds},router}) => ({
    search:user.search,
    settings:user.settings,
    message:user.message,
    path: router && router.location && router.location.pathname,
    breeds:Object.keys(breeds).map(breed=>({breed,subBreeds:breeds[breed]})),
})

export default connect(mapStateToProps,{ forwardRoute, signOut, clearMessage, setSettings, searchAction })(Appbar);