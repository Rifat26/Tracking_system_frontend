import { baseApi } from "../api/baseApi"
const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        sendLocation:builder.mutation({
            query:(data)=>{
                console.log(data,'main piont')
                return {
                    url:'/location/create-user-location',
                    method:'POST',
                    body:data
                }
            }
        }),
        getAllUserLocation:builder.query({
            query:()=>({
                url:'/location/get-all-location',
                method:'GET',
            })
        }),
        getSingleUserLocation:(builder).query({
            query:(id)=>({
                url:`/location/single-user-location/${id}`,
                method:'GET',
            })
        }),
        getSingleUserLocationInformation:(builder).query({
            query:(id)=>({
                url:`/location/single-location/${id}`,
                method:'GET',
            })
        })
    })
})

export const {
    useGetAllUserLocationQuery,
    useGetSingleUserLocationQuery,
    useSendLocationMutation,
    useGetSingleUserLocationInformationQuery
} = authApi