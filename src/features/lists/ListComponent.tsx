import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon, CheckIcon, CheckedIcon } from '../../styles/App.style'
import { StyledList } from '../../styles/List.style'
import { List } from '../../types/apiTypes'

type ListProps = {
    list: List,
    onDeleteClick: React.MouseEventHandler<SVGSVGElement>,
    onUpdateClick: React.MouseEventHandler<SVGSVGElement>,
}

export const ListComponent = ({list, onDeleteClick, onUpdateClick}: ListProps) => {
    const navigate = useNavigate()
    const Icon = list.finished ? CheckedIcon : CheckIcon
    return (
    <StyledList 
        onClick={ () => navigate(`/list/${list.id}`) } 
        finished={list.finished ? "true" : ""}
    >        
        <DeleteIcon onClick={onDeleteClick}/>

        <span>name: {list.name ? list.name : <i>Not specified</i>}</span>

        <span>ID: {list.id}</span>

        <Icon onClick={onUpdateClick} />
    </StyledList>)
}

