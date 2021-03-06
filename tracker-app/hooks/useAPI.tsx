import axios from 'axios'
import Router from 'next/router'
import User from 'model/User'
import PageParam from 'model/PageParam'
import Contract from 'model/Contract'
import Event from 'model/Event'

function useAPI() {
    
    const API = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
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
        get: (contractId: string) => API.get(`contracts/${contractId}`),
        getAll: (page: PageParam) => API.get('contracts', {params: page}),
        edit: (contractId: number, contract: Contract) => API.put(`contracts/${contractId}`, contract),
        delete: (contractId: number) => API.delete(`contracts/${contractId}`),
    }

    const event = {
        create: (contractId: string, event: Event) => API.post(`contracts/${contractId}/events`, event),
        get: (contractId: string, eventId: string) => API.get(`contracts/${contractId}/events/${eventId}`),
        getAll: (contractId: string, page: PageParam) => API.get(`contracts/${contractId}/events`, {params: page}),
        edit: (contractId: string, eventId: number, event: Event) => API.put(`contracts/${contractId}/events/${eventId}`, event),
        delete: (contractId: string, eventId: number) => API.delete(`contracts/${contractId}/events/${eventId}`),
        getLogs: (contractId: string, eventId: string, page: PageParam) => API.get(`contracts/${contractId}/events/${eventId}/logs`, {params: page}),
    }

    return {
        session,
        users,
        contract,
        event,
      }
}

export default useAPI