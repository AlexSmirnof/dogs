import React from 'react';
import { connect } from 'react-redux';
import SignForm from '../components/SignForm/SignForm';
import { messageSelector } from '../redux/selectors';
import { signInAction, clearMessageAction } from '../redux/actions';


export default connect(state => ({message: messageSelector(state)}), { signInAction, clearMessageAction })(SignForm);