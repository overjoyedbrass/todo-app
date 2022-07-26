import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'

type StyledListProps = {
    finished: string
}
export const StyledList = styled(Card)<StyledListProps>`
    border-radius: 2px;
    border: 1px solid #DDD;
    padding: 0 1em 0 0.25em;
    min-width: 10em;
    min-height: 4em;
    background-color: #FEFEFE;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 0.8em;
    position: relative;
    background-color: ${props => props.finished ? "rgb(210, 255, 210)" : "white"};
    cursor: pointer;
`

export const ListContainer = styled('div')`
    display: flex;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    flex-wrap: wrap;
    margin-top: 0.5em;
`