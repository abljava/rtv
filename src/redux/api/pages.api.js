import {api} from './api'

export const slidersApi = api.injectEndpoints({
    endpoints: builder => ({
        getSliders: builder.query({
            query: (lang= "ru") => ({
                
                url: `/sliders?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const serviceApi = api.injectEndpoints({
    endpoints: builder => ({
        getServices: builder.query({
            query: (lang = 'ru') => ({
                
                url: `/services?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})


export const footerApi = api.injectEndpoints({
    endpoints: builder => ({
        getFooter: builder.query({
            query: (lang = "ru") => ({
                
                url: `/podval-sajta?locale=${lang}&populate=*`,
                method: "GET",
            })
        })
    })
})


export const aboutAs = api.injectEndpoints({
    endpoints: builder => ({
        getAboutAs: builder.query({
            query: () => ({
                
                url: "/aboutas?populate=*",
                method: "GET",
            })
        })
    })
})
export const {useGetSlidersQuery, useGetServicesQuery, useGetContactsQuery, useGetAboutAsQuery, useGetFooterQuery} = api;
