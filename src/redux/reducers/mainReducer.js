import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    lang: 'ru',
    moduleWindow: false,
    job: '',
    mobile: false,
}

const mainSlice = createSlice({
      name: 'main',
      initialState,
      reducers: {
          setLang: (state, action) => {
              state.lang = action.payload;
          },
          setModule: (state, action) => {
              state.moduleWindow = action.payload;
          },
          setJob: (state , action) => {
            state.job = action.payload
          },
          setMobile: (state , action) => {
            state.mobile = action.payload
          }
      }
})

export const {reducer , actions} = mainSlice;
