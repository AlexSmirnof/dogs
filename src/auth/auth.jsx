import Repository from '../repository/users';

const defaultUser = {
    authenticated: true, 
    roles:['user'],
    search: '',
    settings:{
        grid: true,
        slides: false,
        autoplay: true
    },
    favorites:{},
    removed:{},
    history:[]
}

export default {

    signInUser(username){
        return Repository.findUserByName(username) || {...defaultUser, username};
    },

    signOutUser(user){
        return Repository.save(user);
    },

    authenticate({username, authenticated}){
        return !!username && !!authenticated;
    },

    authorize({roles:userRoles}, roles){
        if(!roles || roles.trim() === '') return true;
        return userRoles && roles.trim().split(',').map(role=>role.trim()).every(role=>userRoles.some(userRole=>userRole.trim()===role));
    }

}
