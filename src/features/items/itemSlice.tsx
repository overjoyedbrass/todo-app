import { apiSlice } from '../../api/api'
import { fromUnixTime } from 'date-fns'
import { Item } from '../../types/apiTypes'

function compareItemsByDeadline(i1: Item, i2: Item){
    return fromUnixTime(i1.deadline).getTime() - fromUnixTime(i2.deadline).getTime()
}

type ItemCreate = {
    listId: string,
    deadline: number,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems: builder.query<Item[], string>({
            query: (listId) => ({ url: `list/${listId}/item`, method: "get"}),
            transformResponse: responseData => responseData.sort(compareItemsByDeadline),
            providesTags: (_result, _error, listId) => [{ type: 'Items', id: listId }]
        }),
        
        insertItem: builder.mutation<Item, ItemCreate>({
            query: (item) => ({ url: `list/${item.listId}/item`, method: "post", data: item}),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Items', id: arg.listId }]
        }),

        replaceItem: builder.mutation<Item, Item>({
            query: (item) => ({ url: `list/${item.listId}/item/${item.id}`, method: "put", data: item}),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Items', id: arg.listId }]
        }),

        deleteItem: builder.mutation({
            query: ({listId, itemId}) => ({ url: `list/${listId}/item/${itemId}`, method: "delete"}),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Items', id: arg.listId }],
        })
    })
})
  
export const { 
    useGetItemsQuery,
    useInsertItemMutation,
    useDeleteItemMutation,
    useReplaceItemMutation,
 } = extendedApiSlice