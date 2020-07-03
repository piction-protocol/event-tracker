import axios from 'axios';
import Router from 'next/router'
import User from '../model/User'

function useAPI() {
    
    const API = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', //'https://tracker-api.piction.network/',
        headers: {
          'X-Device-Platform': 'web',
        },
        withCredentials: true,
    });

    API.interceptors.response.use(r => r,
        e => ({
          401: () => Router.replace('/login'),
          403: () => Router.replace('/login'),
//          404: () => navigate('/404', {state: {redirectTo: window.location.pathname}, replace: true}),
//          500: () => navigate('/500', {state: {redirectTo: window.location.pathname}, replace: true}),
          400: () => Promise.reject(e)
        }[e.response.status]())
    );

    const session = {
        create: (user: User) => API.post('sessions', user),
        delete: () => API.delete('/sessions'),
    };

    const users = {
        get: () => API.get('users/me')
    }

    return {
        session,
        users,
      };
}

export default useAPI;