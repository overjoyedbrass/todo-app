import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export interface myQuery {
    url: string,
    method?: string,
    data?: object,
    params?: object
}

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params }: myQuery) => {
    try {
        const result = await axios({ url: baseUrl + url, method, data, params })
        return { data: result.data }
    } catch (error: any) {
        let err = error
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err?.message,
            },
        }
    }
    return { data: null }
  }

export const apiSlice = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://62d98afd9eedb699635eb4d4.mockapi.io/api/',
    }),
    tagTypes: ["Lists", "Items", "Item"],
    endpoints: () => ({}),
})