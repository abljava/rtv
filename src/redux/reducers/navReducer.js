import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: {
            ru: "о компании",
            en: "Home",
        },
        href: "/",
        loader: false,
    },
    {
        name: {
            ru: "Услуги",
            en: "Services",
        },
        href: "/routes/services",
        loader: false,
        childs: [
        ]
    },
    {
        name: {
            ru: "тарифы",
            en: "News",
        },
        href: "/routes/news",
        loader: false,
    },
    {
        name: {
            ru: "информация",
            en: "Jobs",
        },
        href: "/routes/jobs",
        loader: false,
    },
    {
        name: {
            ru: "контакты",
            en: "Contacts",
        },
        href: "/routes/pages/contacts",
        loader: false,
    },
    {
        name: {
            ru: "видео",
            en: "Contacts",
        },
        href: "/routes/pages/contacts",
        loader: false,
    }
]

 export const navSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setServices(state, action) {

        }
    }
})

export const {reducer} = navSlice;
