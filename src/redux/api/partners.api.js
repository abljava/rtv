import {api} from "@/redux/api/api"

export const parntersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPartners: builder.query({
            query: () => ({
                
                url: "/partneries?populate=*",
                method: "GET",
            })
        })
    })
})

export const {useGetPartnersQuery} = api;
