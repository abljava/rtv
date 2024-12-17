import {api} from './api'

export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                
                url: '/products?populate=*',
                method: 'GET',
            }),

        }),
    })
})

export const {useGetProductsQuery} = api;
