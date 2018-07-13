
const USERS_KEY = 'dogs:users';
const inMemory = new Proxy( {}, {
            get(target, prop){
                if(prop in target) return target[prop];
                return null; 
            }
});
const createLocalStorage = () => localStorage.setItem(`${USERS_KEY}`, JSON.stringify({})); 
const hasLocalStorage = () => localStorage.getItem(`${USERS_KEY}`);
const withLocalStorage = withLocalStorage => without => {
    if (localStorage) {
        if (!hasLocalStorage()) createLocalStorage();
        const user = withLocalStorage(localStorage);
        return user;
    }
    else {
        return without(inMemory);
    }
} 

export default {

    findUserByName(username){
        return withLocalStorage(localStorage => {
            const serialized = localStorage.getItem(`${USERS_KEY}`);
            return serialized ? JSON.parse(serialized)[username] : null; 
        })(inMemory => inMemory[username]);
    },

    save(user){
        withLocalStorage(localStorage => {
            const serialized = localStorage.getItem(`${USERS_KEY}`);
            const users = JSON.parse(serialized);
            users[user.username] = user;
            localStorage.setItem(`${USERS_KEY}`, JSON.stringify(users));
        })(inMemory => inMemory[user.username] = user);
    }
}

