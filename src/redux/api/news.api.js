import {api} from './api'

export const newsApi = api.injectEndpoints({
    endpoints: builder => ({
        getNews: builder.query({
            query: (lang = 'ru') => ({
                
                url: `/news?locale=${lang}&populate=*`,
                method: 'GET',
            })
        }),
        getNewsID: builder.query({
            query: (id = 1, lang = 'ru') => ({
                
                url: `/news/${id}?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})


export const {useGetNewsQuery, useGetNewsIDQuery} = api;
