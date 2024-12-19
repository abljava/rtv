import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${process.env.NEXT_PUBLIC_CONNECT}://${
  process.env.NEXT_PUBLIC_HOST_API
}${process.env.NEXT_PUBLIC_PORT ? `:${process.env.NEXT_PUBLIC_PORT}` : ""}/api`;

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: "cors",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = true; //localStorage.getItem("token");
      if (accessToken) {
        headers.set(
          "authorization",
          `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    main: builder.query({
      query: () => "/",
    }),
  }),
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  return await baseQuery(args, api, extraOptions);
};
