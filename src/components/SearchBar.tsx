import { TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SmallDeleteIcon, SearchIcon } from '../styles/App.style'
export const SearchBar = () => {
    const [text, setText] = React.useState("")

    const handleChange = (e: any) => 
        setText(e.target.value)

    const navigate = useNavigate()

    function submitSearch(event: any){
        event.preventDefault()
        if(!text) navigate("")
        else navigate(`?search=${text}`)
    }

    function clearSearch(event: React.MouseEvent<SVGSVGElement>){
        event.preventDefault()
        setText("")
        navigate("")
    }

    return (
        <form style={{ position: "relative" }} onSubmit={submitSearch}>
            <TextField
                sx={{"width": "fit-content"}}
                size="small"
                type="text"
                name="text"
                value={text}
                onChange={handleChange}
            />
            { text ? <SmallDeleteIcon onClick={clearSearch} /> : null }
            <SearchIcon type="submit" value={text} onClick={submitSearch}/>
        </form>
    )
}