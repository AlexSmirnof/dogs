import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signIn, clearMessage } from '../actions/user';
import SignForm from '../components/SignForm/SignForm';


export default connect(state=>({message:state.user.message}),{ signIn, clearMessage })(SignForm);