import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  //baseUrl: "http://localhost:9000/api",
  baseUrl: "https://tracking-system-backend-self.vercel.app/api",
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`); // Add Bearer if it's a JWT
    }
    return headers;
  },
});

// const BaseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     console.log("Token expired, refreshing...");

//     // Attempt to refresh token
//     const res = await fetch(`http://localhost:9000/api/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//     });

//     if (!res.ok) {
//       // Handle token refresh failure
//       api.dispatch(logout()); // Log out if refresh fails
//       return { error: new Error("Session expired. Please log in again.") }; // Return error to indicate user is logged out
//     }

//     const data = await res.json();

//     if (data?.data?.accessToken) {
//       // If refresh was successful, update the state with the new token
//       const user = api.getState().auth.user; // Get current user info
//       api.dispatch(setUsers({ user, token: data.data.accessToken })); // Set new token in the state

//       // Retry the original request with the new token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // If refresh fails, log out the user
//       api.dispatch(logout());
//       result = {
//         error: new Error("Failed to refresh token. Please log in again."),
//       };
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}), // Add your endpoints here
});
