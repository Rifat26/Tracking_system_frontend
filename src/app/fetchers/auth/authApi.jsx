import { baseApi } from "../api/baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        console.log(data, "main point");
        return {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useVerifyMutation } =
  authApi;
