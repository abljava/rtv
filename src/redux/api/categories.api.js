import {api} from './api'

export const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                
                url: '/categories?populate=*',
                method: 'GET',
            }),

        }),
    })
})

export const {useGetCategoriesQuery} = api;
