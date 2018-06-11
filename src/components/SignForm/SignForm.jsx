import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { push } from 'react-router-redux';

const errorText = 'Your name is required!'

class SignForm extends Component {

    state = {
        username: '',
        errorText:''
    }

    submit = () => {
        const username = this.state.username.trim();
        if (username) {
            this.props.signIn(username);
            this.setState({username:''});
        } else {
            this.setState({errorText});
        }
    }

    onEnter = ({keyCode}) => {
        if(keyCode === 13) this.submit();
    }


    render(){

        const { signIn, message, clearMessage } = this.props;

        return (
            <div>
                <AppBar title={'Sign in'}
                        showMenuIconButton={false}
                        /> 
                <div id="searchBar" style={{textAlign:'center'}}>
                    <TextField 
                        style={{margin:'120px 0 60px'}}
                        floatingLabelText="Enter your name" 
                        value={this.state.username}
                        errorText={this.state.errorText}
                        onKeyDown={this.onEnter}
                        onChange={(_, username) => this.setState({username, errorText:''})}
                        ref={input => input && input.focus()}
                        /><br/>
                    
                    <RaisedButton label="Submit" primary={true} onClick={this.submit}/>
                </div>    
                <Snackbar open={!!message}
                          message={message}
                          autoHideDuration={2500}
                          onRequestClose={clearMessage}/>
            </div>
        )
    }

}

export default SignForm;