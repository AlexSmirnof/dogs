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
    timeout: 1500    
})

class DogsApi {

    fetchBreeds = () => dogCeo(URL.breeds);

    fetchSubBreeds = () => dogCeo(URL.subBreeds);

    fetchOne = () => dogCeo(URL.random);

    fetchByBreed = (breed) => dogCeo(URL.byBreed.replace('{breed}', breed));

    fetchByBreedAndSubBreed = (breed, subBreed) => dogCeo(URL.bySubBreed.replace('{breed}',breed).replace('{subBreed}',subBreed));

}

export default new DogsApi();