import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export const AddListForm = styled('form')`
    display: flex;
    flex-direction: column;
    width: fit-content;
    grid-row-gap: 0.25em;
`
export const InputField = styled(TextField)`
    width: fit-content;
`

export const SubmitButton = styled(Button)`
    height: 2em;
    width: fit-content;
    margin: 0 auto;
    text-transform: capitalize;
    font-size: 0.8em;
`

export const AddItemForm = styled('form')`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`