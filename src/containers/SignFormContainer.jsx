import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signIn, clearMessage } from '../actions/user';
import SignForm from '../components/SignForm/SignForm';
import { messageSelector } from '../selectors/selectors';


export default connect(state=>({message:messageSelector(state)}), { signIn, clearMessage })(SignForm);