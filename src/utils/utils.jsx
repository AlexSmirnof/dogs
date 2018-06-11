import * as R from 'ramda';

export function extractBreed(url){
    return url.split('/breeds/')[1].split('/')[0];
}

export function extractSubBreed(url){
    const breeds = url.split('/breeds/')[1].split('/')[0].split('-');
    return breeds.length > 1 ? breeds[1] : null;
}

export function extractHost (url) {
    return url.split('://')[1].split('/')[0];
} 

export function capitalize(str) {
    return str.charAt(0).toUpperCase().concat(str.slice(1).toLowerCase());
  }

export function hasBreed(Breeds, Breed){
    if(Breed.trim() === '') return false;
    if(Breed.indexOf('-') > 0){
        const [breed, subBreed] = Breed.split('-');
        return Breeds[breed] && Breeds[breed].some(SubBreed => SubBreed === subBreed);
    }
    return R.isEmpty(Breeds[Breed.trim()]);


}