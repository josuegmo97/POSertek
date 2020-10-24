import Axios from 'axios';

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const deleteToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('familiar-info');
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const initAxiosIntercerptors = () => {
    Axios.defaults.headers.common['Content-Type'] = 'application/json'
    Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    Axios.interceptors.request.use(config => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
        
    }, error => {
        return Promise.reject(error);
    });

    Axios.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            if (err.response.status === 401){
                deleteToken();
            }
        });
}
