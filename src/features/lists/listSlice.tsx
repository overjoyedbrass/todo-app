import { apiSlice } from '../../api/api'
import { List } from '../../types/apiTypes'

export type CreateListResponse = {
    id: number
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLists: builder.query<List[], void>({
            query: () => ({ url: "list", method: "get"}),
            providesTags: ["Lists"],
        }),
        
        getListById: builder.query<List, string>({
            query: (listId: string) => ({ url: `list/${listId}`, method: "get"}),
        }),

        postList: builder.mutation<CreateListResponse, string>({
            query: (name: string) => ({ url: "list", method: "post", data: {name: name}}),
            invalidatesTags: ["Lists"]
        }),

        replaceList: builder.mutation<void, List>({
            query: (list: List) => ({ url: `list/${list.id}`, method: "put", data: list}),
            invalidatesTags: ["Lists"]
        }),

        deleteList: builder.mutation<void, string>({
            query: (listId: string) => ({ url: `list/${listId}`, method: "DELETE"}),
            invalidatesTags: ["Lists"]
        })    
    }),
    overrideExisting: false
})

export const { 
    useGetListsQuery,
    useGetListByIdQuery,
    usePostListMutation,
    useDeleteListMutation,
    useReplaceListMutation
} = extendedApiSlice