import {api} from './api'

export const plusesApi = api.injectEndpoints({
    endpoints: builder => ({
        getPluses: builder.query({
            query: (lang= 'ru') => ({
                
                url: `/plyusy-raboty-vakansiis?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const {useGetPlusesQuery} = api;
