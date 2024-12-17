import {api} from './api'

export const dPagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAbout: builder.query({
            query: (lang) => ({
                url: `/stranicza-o-kompanii?locale=${lang}&populate=*`,
                method: 'GET',
            }),
        }),
        getOurWorks: builder.query({
            query: (lang) => ({
                url: `/ourworks?locale=${lang}&populate=*`,
                method: 'GET'
            })
        }),
        getWorksId: builder.query({
            query: (id,lang) => ({
                url: `/ourworks/${id}?locale=${lang}&populate=*`,
                method: 'GET',
            })
        }),
        getClientsAndPartners: builder.query({
           query: (lang) => ({
               url: `/stranicza-klienty-i-partnery?locale=${lang}&populate=*`,
               method: 'GET',
           })
        }),
        getClients: builder.query({
           query: (params) => ({
               url: `/ourclients?locale=${params}&populate=*`,
               method: 'GET',
           })
        }),
        getPartners: builder.query({
           query: (params) => ({
               url: `/partners?locale=${params}&populate=*`,
               method: 'GET',
           })
        }),
        getTarrifs: builder.query({
            query: (params) => ({
                url: `/stranicza-tarify?locale=${params}&populate=*`,
                method: 'GET'
            })
        }),
        getInformation: builder.query({
            query: (params) => ({
                url: `/stranicza-informacziya?locale=${params}&populate=*`,
                method: 'GET'
            })
        }),
        getReq: builder.query({
            query: (params) => ({
                url: `/informacziya-rekvizities?locale=${params}&populate=*`,
                method: 'GET'
            })
        }),
        getDocuments: builder.query({
            query: (params) => ({
                url: `/informacziya-dokumenties?locale=${params}&populate=*`,
                method: 'GET'
            })
        }),
        getRules: builder.query({
            query: (params) => ({
                url: `/informacziya-pravila-i-instrukcziis?locale=${params}&populate=*`,
                method: 'GET'
            })
        }),
        getVideos: builder.query({
            query: (params) => ({
                url: `/vse-videos?locale=${params}&populate=*`,
                method: 'GET'
            })
        })

    })
})

export const {
    useGetAboutQuery, useGetOurWorksQuery, useGetClientsAndPartnersQuery,
    useGetClientsQuery, useGetPartnersQuery, useGetWorksIdQuery, useGetTarrifsQuery,
    useGetInformationQuery, useGetReqQuery, useGetDocumentsQuery, useGetRulesQuery,
    useGetVideosQuery
} = api;
