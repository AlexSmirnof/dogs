import React, {Component} from 'react';
import { connect } from 'react-redux';
import SignForm from '../components/SignForm/SignForm';
import { messageSelector } from '../selectors/selectors';
import { signInAction, clearMessageAction } from '../actions/actions';


export default connect(state => ({message: messageSelector(state)}), { signInAction, clearMessageAction })(SignForm);