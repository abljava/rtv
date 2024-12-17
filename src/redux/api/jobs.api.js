import {api} from './api'

export const jobsApi = api.injectEndpoints({
    endpoints: builder => ({
        getJobs: builder.query({
            query: (lang = 'ru') => ({
                
                url: `/info-block1?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const jobsAllApi = api.injectEndpoints({
    endpoints: builder => ({
        getJobsAll: builder.query({
            query: (lang= 'ru') => ({
                
                url: `/jobs?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})

export const jobsIdApi = api.injectEndpoints({
    endpoints: builder => ({
        getJobsId: builder.query({
            query: (id = 0) => ({
                
                url: `/jobs/${id}?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})


export const { useGetJobsQuery, useGetJobsAllQuery , useGetJobsIdQuery} = api;
