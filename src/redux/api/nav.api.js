import {api} from './api'

export const navApi = api.injectEndpoints({
    endpoints: builder => ({
        getNav: builder.query({
            query: (lang = 'ru') => ({
                url: `/navups?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const {useGetNavQuery} = api;
