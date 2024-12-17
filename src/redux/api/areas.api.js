import {api} from './api'

export const areasApi = api.injectEndpoints({
    endpoints: builder => ({
        getAreas: builder.query({
            query: (locale = 'ru') => ({
                url: `/services?locale=${locale}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const areasIdApi = api.injectEndpoints({
    endpoints: builder => ({
        getAreasId: builder.query({
            query: (id = 1,locale = 'ru') => ({
                url: `/services/${id}?locale=${locale}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const {useGetAreasQuery , useGetAreasIdQuery} = api;
