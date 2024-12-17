import {api} from './api'

export const officesApi = api.injectEndpoints({
    endpoints: builder => ({
        getOffices: builder.query({
            query: (lang = 'ru') => ({
                
                url: `/otdely-kontakties?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const {useGetOfficesQuery} = api;
