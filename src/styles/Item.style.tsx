import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'

interface StyledItemProps {
    finished: String
}
export const StyledItem = styled(Card)<StyledItemProps>`
    border: 1px solid #DDD;
    border-radius: 5px;
    width: fit-content;
    min-height: 10em;
    min-width: 10em;
    margin-bottom: 0.5em;
    padding: 0.5em;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.finished ? "rgb(210, 255, 210)" : "white"};
    grid-row-gap: 0.5em;
    /* span+span {
        margin-top: 0.5em;
    } */
`

export const ItemsContainer = styled('div')`
    display: flex;
    grid-column-gap: 10px;
    grid-row-gap: 5px;
    flex-wrap: wrap;
    margin-top: 0.5em;
`

export const StyledAddItem = styled(StyledItem)`
    border: 2px solid;
    border-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`