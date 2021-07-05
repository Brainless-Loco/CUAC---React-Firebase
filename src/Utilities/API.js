const apiUrl = 'http://localhost:9000';

export const postItem = (requestOptions) => {
    fetch(apiUrl + '/post-item', requestOptions)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}