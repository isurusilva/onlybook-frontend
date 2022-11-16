import axios from 'axios';

// const { token } = store.getState();

const token = localStorage.getItem('token');
// console.log('token');

// console.log(token);
// console.log(store.getState().token);
const instance = axios.create({
    // baseURL: 'http://localhost:8080/',
    baseURL: "http://networkmidassignmentbackend-env.eba-7xrr3rzr.ap-south-1.elasticbeanstalk.com",
    timeout: 30000,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// instance.interceptors.request.use(
//     (config) => {
//         // Do something before request is sent
//         const token = localStorage.getItem('token');
//         // console.log('token');
//         // console.log(token);
//         config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     },
//     (error) => {
//         // Do something with request error
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

instance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log(response);
        console.log(response.status);
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error);
        console.log(error.response);
        if (error.response !== undefined && error.response.status === 402) {
            console.log('error');
            window.location = '/';
        } else {
            let msg = 'Cannot find the Server';
            if (error.response.data !== undefined && error.response.data.message !== undefined) {
                msg = error.response.data.message;
                console.log(msg);
            }
            // Message.addMessage({ title: 'Error was Occured!', msg, type: 'danger' });
        }
        return Promise.reject(error);
    }
);

export default instance;
