import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, Spinner, Heading, AddButton, ControlBar, TitleSpan } from '../../styles/App.style'
import { ListContainer } from '../../styles/List.style'
import { ListComponent } from './ListComponent'
import { useDeleteListMutation, useGetListsQuery, useReplaceListMutation } from './listSlice'
import { MenuItem, Select } from '@mui/material'
import { SearchBar } from '../../components/SearchBar'
import { List } from '../../types/apiTypes'

export const AllLists = () => {
    const [filter, setFilter] = React.useState(0)    
    const handleFilter = (event: any) => setFilter(event.target.value)

    const {
        data: allLists=[],
        isLoading,
        isFetching,
    } = useGetListsQuery()

    const queryParams = new URLSearchParams(window.location.search)
    const searchString = queryParams.get("search")
    const navigate = useNavigate()

    const [ deleteList, { isLoading: isDeletingList }] = useDeleteListMutation()
    const [ updateList, { isLoading: isUpdatingList }] = useReplaceListMutation()    

    var filteredLists = allLists.filter(list => 
        (list.finished && filter === 1) || 
        (!list.finished && filter === 2) || 
        !filter
    )
    if(searchString)
        filteredLists = filteredLists.filter(list => list.name.includes(searchString))


    async function onUpdate(event: any, list: List){
        event.stopPropagation()
        if(isUpdatingList || isLoading || isFetching){
            return
        }
        try {
            await updateList({
                ...list,
                finished: !list.finished
            })
        } catch (err) { }
    }

    async function onDelete(event: any, id: string){
        event.stopPropagation()
        if(isDeletingList || isLoading || isFetching){
            return
        }
        try {
            await deleteList(id);
        } catch (err){ }
    }

    return (
        <AppContent>
            <TitleSpan>
                <Heading>All ToDo lists ({filteredLists.length})</Heading>
                {isDeletingList ? <span>&nbsp; Deleting list. . .</span> : null}
                {isUpdatingList ? <span>&nbsp; Checking list. . .</span> : null}
            </TitleSpan>

            <ControlBar>
                <SearchBar />
                <Select size='small' value={filter} onChange={handleFilter}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Done</MenuItem>
                    <MenuItem value={2}>Not finished</MenuItem>
                </Select>
                <AddButton 
                    onClick={ () => navigate("/addList") }
                    size="small"
                    >
                        Create list +
                </AddButton>
            </ControlBar>
            <span style={{display: "inline"}}>
                {filteredLists.length ? "Click on any list to show his content." : "No lists to show."}
            </span>

            {isLoading || isFetching ? <Spinner /> :
            <ListContainer>
                {filteredLists.map(lst => 
                    (<ListComponent
                        key={lst.id} 
                        list={lst}
                        onDeleteClick={(event) => onDelete(event, lst.id)}
                        onUpdateClick={(event) => onUpdate(event, lst)}
                    />))}
            </ListContainer>}
        </AppContent>
    )
}