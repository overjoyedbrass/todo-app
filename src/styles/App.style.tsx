import { styled } from '@mui/material/styles'
import stylled, { css, keyframes } from 'styled-components'
import { Delete } from '@styled-icons/typicons/Delete'
import { Checkbox } from '@styled-icons/boxicons-regular/Checkbox'
import { CheckboxChecked } from '@styled-icons/boxicons-regular'
import Button from '@mui/material/Button'
import { Search } from '@styled-icons/boxicons-regular/Search'



const iconStyle = `
    color: gray;
    cursor: pointer;
`

interface SearchIconProps {
    value: string
}
export const SearchIcon = styled(Search)<SearchIconProps>`
    ${iconStyle};
    position: absolute;
    width: 1.25em;
    height: 1.25em;
    top: 0.25em;
    right: 0.25em;
    width: 1.5em;
    height: 1.5em;
    position: absolute;
`

export const TitleSpan = styled('span')`
    font-size: 1em;
    display: flex;
    flex-direction: row;
    grid-column-gap: 10px;
`

export const ControlBar = styled('div')`
    align-items: center;
    display: flex;
    grid-column-gap: 10px;
    grid-row-gap: 5px;
    flex-wrap: wrap;
    flex: 1 1;
`
export const SmallDeleteIcon = styled(Delete)`
    ${iconStyle};
    position: absolute;
    width: 1.3em;
    height: 1.3em;
    top: 0.20em;
    right: 1.5em;
`
export const DeleteIcon = styled(Delete)`
    ${iconStyle};
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    top: 0.25em;
    right: 0.25em;
    color: #EE0000;
`
export const CheckIcon = styled(Checkbox)`
    ${iconStyle};
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    bottom: 0.25em;
    right: 0.25em;
    color: black;
`

export const CheckedIcon = styled(CheckboxChecked)`
    ${iconStyle};
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    bottom: 0.25em;
    right: 0.25em;
    color: green;
    cursor: pointer;
`

export const AppContent = styled('div')`
    margin-left: 0.25em;
    padding: 1em 1em 0em 1em;
    border-radius: 10px;
    font-size: 1.4em;
    display: flex;
    flex-direction: column;
    flex: 1 1;
`

export const AppWrapper = styled('div')`
    font-family: 'Rubik', sans-serif;
    display: flex;
    height: 100%;
`
export const HomePage = styled('div')`
    display: 'flex';
    height: 100%;
    width: 100%;
`
export const Heading = styled('h3')`
    margin: 0 0 0.5em 0;
    display: inline;
    color: rgb(84, 78, 114);
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const AddButton = styled(Button)`
    width: fit-content;
    display: inline-block;
    text-transform: initial;
    font-size: 1em;
`

interface SpinnerProps {
    centered?: boolean
}
export const Spinner = stylled.div<SpinnerProps>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 3px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  margin-left: 1em;
  margin: ${props => props.centered ? "0 auto 0 auto" : ""};
  border-radius: 50%;
`;