import axios from 'axios'
import Router from 'next/router'
import User from '../model/User'
import Contract from '../model/Contract'
import Pageable from '../model/Pageable'

function useAPI() {
    
    const API = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', //'https://tracker-api.piction.network/',
        headers: {
          'X-Device-Platform': 'web',
        },
        withCredentials: true,
    })

    API.interceptors.response.use(r => r,
        e => ({
          401: () => Router.replace('/login'),
          403: () => Router.replace('/login'),
//          404: () => navigate('/404', {state: {redirectTo: window.location.pathname}, replace: true}),
//          500: () => navigate('/500', {state: {redirectTo: window.location.pathname}, replace: true}),
          400: () => Promise.reject(e)
        }[e.response.status]())
    )

    const session = {
        create: (user: User) => API.post('sessions', user),
        delete: () => API.delete('/sessions'),
    }

    const users = {
        get: () => API.get('users/me')
    }

    const contract = {
        create: (contract: Contract) => API.post('contracts', contract),
        get: (contractId: number) => API.get(`contracts/${contractId}`),
        getAll: (page: Pageable) => API.get('contracts', {params: page}),
        edit: (contractId: number, contract: Contract) => API.put(`contracts/${contractId}`, contract),
        delete: (contractId: number) => API.delete(`contracts/${contractId}`),
    }

    return {
        session,
        users,
        contract,
      }
}

export default useAPI