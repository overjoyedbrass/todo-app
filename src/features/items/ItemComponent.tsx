import React from 'react'
import { StyledItem } from '../../styles/Item.style'
import { format, fromUnixTime } from 'date-fns'
import { DeleteIcon, CheckIcon, CheckedIcon } from '../../styles/App.style'
import { Item } from '../../types/apiTypes'

interface ItemProps {
    onItemDelete: React.MouseEventHandler<SVGSVGElement>,
    onItemUpdate: React.MouseEventHandler<SVGSVGElement>,
    item: Item,
}

export const ItemComponent = ({onItemDelete, onItemUpdate, item, ...props}: ItemProps) => {
    const Icon = item.finished ? CheckedIcon : CheckIcon
    return (
    <StyledItem {...props} 
        finished={item.finished ? "true" : ""}
    >
        <span>{ item.title ? item.title : <i>Title not specified</i>}</span>
        <span>{ item.description ? item.description : <i>no description</i>}</span>
        <span>{ format(fromUnixTime(item.deadline), "dd. MM. yy | hh:mm") }</span>
        <DeleteIcon 
            id={item.id.toString()}
            onClick={onItemDelete}
        />
        <Icon onClick={onItemUpdate} />
    </StyledItem>)
}