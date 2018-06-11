import React, {Component} from 'react';
import { connect } from 'react-redux';
import { forwardRoute, signOut, clearMessage, setSettings, searchAction } from '../actions/user';
import Appbar from '../components/Appbar/Appbar';
import { withRouter } from 'react-router-dom';
import { searchSelector, settingsSelector, messageSelector, pathnameSelector, breedsArraySelector } from '../selectors/selectors';


const mapStateToProps = state => ({
    search: searchSelector(state),
    settings: settingsSelector(state),
    message: messageSelector(state),
    path: pathnameSelector(state),
    breeds:breedsArraySelector(state)
})

export default connect(mapStateToProps,{ forwardRoute, signOut, clearMessage, setSettings, searchAction })(Appbar);