import {api} from './api'

export const contactsApi = api.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: (lang = "ru") => ({
                url: `/stranicza-kontakty?locale=${lang}&populate=*`,
                method: 'GET',
            })
        })
    })
})



export const { useGetContactsQuery } = api;
