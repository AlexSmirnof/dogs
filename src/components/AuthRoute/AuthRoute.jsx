import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import { authenticateUser } from '../../actions/user';


class AuthRoute extends Component{

    static getDerivedStateFromProps({pathname = '/', authenticateUser=()=>{}, roles='user'}, state){
        authenticateUser({roles,cachedRedirect:pathname});
        return state;
    }

 
    render(){
        const { path, component: Component, authenticateUser, roles, ...rest} = this.props;
        return (
            <Route {...rest} path={path} render={props => <Component {...props} />}/>
        )
    }
}

const mapStateToProps = ({router}) => ({
    pathname: router && router.location && router.location.pathname
})

export default connect(mapStateToProps, { authenticateUser })(AuthRoute);
