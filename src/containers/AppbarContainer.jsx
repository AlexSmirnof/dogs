import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Appbar from '../components/Appbar/Appbar';
import { forwardRouteAction, signOutAction, clearMessageAction, setSettingsAction, searchAction } from '../redux/actions';
import { searchSelector, settingsSelector, messageSelector, pathnameSelector, breedsArraySelector } from '../redux/selectors';


const mapStateToProps = state => ({
    path: pathnameSelector(state),
    search: searchSelector(state),
    message: messageSelector(state),
    settings: settingsSelector(state),
    breeds: breedsArraySelector(state)
})

export default connect(mapStateToProps, { forwardRouteAction, signOutAction, clearMessageAction, setSettingsAction, searchAction })(Appbar);