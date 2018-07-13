import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { authenticateUserAction } from '../../redux/actions';


class AuthRoute extends Component{

    static getDerivedStateFromProps({pathname = '/', authenticateUserAction=()=>{}, roles='user'}, state){
        authenticateUserAction({roles,cachedRedirect:pathname});
    }

 
    render(){
        const { path, component: Component, authenticateUserAction, roles, ...rest} = this.props;
        return (
            <Route {...rest} path={path} render={props => <Component {...props} />}/>
        )
    }
}

const mapStateToProps = ({router}) => ({
    pathname: router && router.location && router.location.pathname
})

export default connect(mapStateToProps, { authenticateUserAction })(AuthRoute);
