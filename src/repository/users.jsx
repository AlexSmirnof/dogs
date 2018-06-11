

const USERS_KEY = 'repository:users';

class LocalStorageUsersRepository {

    constructor(){
        if(!localStorage.getItem(`${USERS_KEY}`)) {
            localStorage.setItem(`${USERS_KEY}`, JSON.stringify({})); 
        } 
    }

    findUserByName(username){
       const serialized = localStorage.getItem(`${USERS_KEY}`);
       return serialized ? JSON.parse(serialized)[username] : null; 
    }

    save(user){
        const serialized = localStorage.getItem(`${USERS_KEY}`) || {};
        const users = JSON.parse(serialized);
        users[user.username] = user;
        localStorage.setItem(`${USERS_KEY}`, JSON.stringify(users));
    }

    clear(){
        localStorage.clear();
    }

}

export default new LocalStorageUsersRepository();