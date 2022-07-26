import { Select, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContent, Spinner, AddButton, ControlBar, TitleSpan, Heading } from '../../styles/App.style'
import { ItemComponent } from './ItemComponent'
import { useDeleteListMutation, useGetListByIdQuery } from '../lists/listSlice'
import { useGetItemsQuery, useDeleteItemMutation, useReplaceItemMutation } from './itemSlice'
import { ItemsContainer } from '../../styles/Item.style'
import { AddItem } from './AddItem'
import { SearchBar } from '../../components/SearchBar'
import { Item } from '../../types/apiTypes'

export const AllItems = () => {
    const [addItem, setAddItem] = React.useState(false)
    const [filter, setFilter] = React.useState(0)

    const handleFilter = (event: any) => setFilter(event.target.value)

    const queryParams = new URLSearchParams(window.location.search)
    const searchString = queryParams.get("search")

    const navigate = useNavigate()
    var { id: listId } = useParams()
    
    var list_id = "0"
    if(!isNaN(Number(list_id))){
        var list_id = listId as string
    }

    const {
        data: list=null,
        isLoading: isLoadingList,
    } = useGetListByIdQuery(list_id)
    
    const {
        data: allItems=[],
        isLoading: isLoadingItems,
        isFetching: isFetchingItems,
    } = useGetItemsQuery(list_id)

    var filteredItems = allItems.filter((item: Item) => 
        (item.finished && filter === 1)  || 
        (!item.finished && filter === 2) || 
        !filter
    )
    if(searchString){
        filteredItems = filteredItems.filter((item: Item) => 
           item.title.includes(searchString) ||
           item.description.includes(searchString)
        )
    }

    const [ deleteList, { isLoading: isDeletingList }] = useDeleteListMutation()
    const [ deleteItem, { isLoading: isDeletingItem }] = useDeleteItemMutation()
    const [ updateItem, { isLoading: isUpdatingItem }] = useReplaceItemMutation()

    
    if(isLoadingList){
        return <AppContent><Spinner /></AppContent>
    }
    if(list === null){
        return (<AppContent>
            <Heading>Resource with ID: {list_id} not found.</Heading>
        </AppContent>)
    }

    async function onListDelete(event: React.MouseEvent<HTMLButtonElement>){
        event.stopPropagation()
        if(!list_id){
            return
        }
        if(isDeletingList || isLoadingItems || isFetchingItems || isLoadingList) 
            return
        try{
            await deleteList(list_id)
            navigate("/list")
        } catch (err) { }
    }

    async function onItemDelete(event: React.MouseEvent<SVGSVGElement, MouseEvent>, itemId: string){        
        event.stopPropagation()
        if(isDeletingItem || isLoadingItems || isFetchingItems || isLoadingList) 
            return;
        try {
            await deleteItem({listId: list_id, itemId})
        } catch (err) { }
    }

    async function onItemUpdate(event: React.MouseEvent<SVGSVGElement, MouseEvent>, item: Item){
        event.stopPropagation()
        if(isUpdatingItem || isLoadingItems || isFetchingItems || isLoadingList) 
            return;
        try {
            await updateItem({
                ...item,
                listId: list_id?.toString(),
                finished: !item.finished
            })
        } catch (err) { }
    }

    return <AppContent>
        <TitleSpan>
            Name: {list.name ? list.name : <i>not specified</i>} [ ID: {list.id}  ] ({filteredItems.length} items)
            {isDeletingList ? <span>&nbsp; Deleting list. . .</span> : null}
            {isDeletingItem ? <span>&nbsp; Deleting item. . .</span> : null}
            {isUpdatingItem ? <span>&nbsp; Checking item. . .</span> : null}
            { isLoadingItems || isFetchingItems ? <Spinner /> : null}
        </TitleSpan>
        <ControlBar>
            <SearchBar />

            <Select size='small' value={filter} onChange={handleFilter}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Done</MenuItem>
                <MenuItem value={2}>Not finished</MenuItem>
            </Select>

            &nbsp;
            
            <AddButton 
                variant={addItem ? "outlined" : "text"}
                size="small"
                onClick={() => setAddItem(!addItem)}
            >
                {addItem ? "Cancel" : "Add item"}
            </AddButton>

            &nbsp;

            <AddButton color="error" onClick={onListDelete}>Delete list</AddButton>
        </ControlBar>

        {filteredItems.length === 0 && !addItem ? <span>No Items here.</span> : null}

        <ItemsContainer>
            {addItem ? 
                <AddItem 
                    onClose={() => setAddItem(false)}
                    listId={list_id.toString()}
            /> : null}
            { filteredItems.map((item: Item) => 
                <ItemComponent
                    key={item.id.toString()} 
                    item={item}
                    onItemDelete={ (event) => onItemDelete(event, item.id)}
                    onItemUpdate={ (event) => onItemUpdate(event, item)}
                />
            )}
        </ItemsContainer>

    </AppContent>
}
