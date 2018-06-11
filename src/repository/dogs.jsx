

const DOGS_KEY = 'dogs:repository:dogs';

class LocalStorageDogsRepository {

    persist(username){
       const serialized = localStorage.getItem(`${USERS_KEY}:${username}`);
       if (serialized) return JSON.parse(serialized);
       return null; 
    }

    save(user){
        const serialized = JSON.stringify(user);
        localStorage.setItem(`${USERS_KEY}:${user.username}`, serialized);
    }

    clear(){
        localStorage.clear();
    }

}

export default new LocalStorageDogsRepository();