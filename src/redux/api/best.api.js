import {api} from './api'

export const bestApi = api.injectEndpoints({
    endpoints: builder => ({
        getBest: builder.query({
            query: (lang = "ru") => ({

                url: `/whywes?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})


export const {useGetBestQuery} = api;
