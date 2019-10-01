import axios from "axios";



// this function will be used when user has logged in
export function setTokenHeader(token){
    // if a jwt token exists, send it along in the headers with all future requests
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
    // otherwise, remove that token from headers
        delete axios.defaults.headers.common["Authorization"];
    }
}







// Generic apiCall function that can be re-used for different ajax calls
// takes method (GET / POST), a path ("/api/todos...") and some data to send
// and makes the api request
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data).then(res => {
            // axios always returns a sub object called data
            return resolve(res.data)
        }).catch(err => {
            return reject(err.response.data.error);
        })
    })
}