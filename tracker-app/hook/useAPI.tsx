import {useCookies} from 'react-cookie';
import axios from 'axios';
import Router from 'next/router'

function useAPI() {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const accessToken = cookies.access_token
    const API = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'https://tracker-api.piction.network/',
        headers: {
          'X-Auth-Token': accessToken,
          'X-Device-Platform': 'web',
        },
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
        create: (data) => API.post('sessions', data),
        delete: () => API.delete('/sessions'),
    };

    const token = {
        get: () => accessToken,
        create: (accessToken) => setCookie('access_token', accessToken, {path: '/'}),
        delete: () => removeCookie('access_token'),
    };

    const users = {
        get: () => API.get('users/me')
    }
}