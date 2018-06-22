import axios from 'axios';

const URL = {
    base:`https://dog.ceo/api`,
    breeds: `/breeds/list/all`,
    subBreeds: `/breed/{subBreed}/list`,
    random: `/breeds/image/random`,
    byBreed: `/breed/{breed}/images`,
    bySubBreed: '/breed/{breed}/{subBreed}/images'
}

const dogCeo = axios.create({
    baseURL: URL.base,
    timeout: 2000    
})

class DogsApi {

    fetchBreeds = () => dogCeo(URL.breeds);

    fetchSubBreeds = () => dogCeo(URL.subBreeds);

    fetchOne = () => dogCeo(URL.random);

    fetchMore = (length=1) => axios.all(Array.from({length},_=>dogCeo(URL.random)));

    fetchByBreed = (Breed) => {
        if (!Breed) return null;
        const [ breed, subBreed ] = Breed.trim('-').split('-');
        if (subBreed && subBreed.trim().length > 0) return this.fetchByBreedAndSubBreed(breed.trim(),subBreed.trim());
        return dogCeo(URL.byBreed.replace('{breed}', breed.trim()));
    }
    fetchByBreedAndSubBreed = (breed, subBreed) => dogCeo(URL.bySubBreed.replace('{breed}',breed).replace('{subBreed}',subBreed));

}

export default new DogsApi();