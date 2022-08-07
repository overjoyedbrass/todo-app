import React from 'react'
import { StyledAddItem } from '../../styles/Item.style'
import { AddItemForm, SubmitButton } from '../../styles/Form.style'
import TextField from '@mui/material/TextField';
import { format, parseISO, getUnixTime, add } from 'date-fns'
import { useInsertItemMutation } from './itemSlice';
import { Spinner } from '../../styles/App.style';

const initialState = {
    title: "",
    description: "",
    deadline: format(add(new Date(), {'days': 1}), "yyyy-MM-dd'T'hh:mm")
}

type AddItemProps = {
    listId: string,
    onClose: any,
}

export const AddItem = ({listId, onClose}: AddItemProps) => {
    const [formState, setFormState] = React.useState(initialState)
    
    const handleChange = ({target: {name, value}} : any) => {
        setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const dateError = (parseISO(formState.deadline).getTime() - new Date().getTime()) < 0
    
    const [ addItem, { isLoading: isAddingItem }] = useInsertItemMutation()

    async function submit(event: any){
        event.preventDefault()
        if(isAddingItem || dateError) return
        try {
            await addItem({
                listId: listId,
                ...formState,
                deadline: getUnixTime(parseISO(formState.deadline)),
            })
            onClose()
        } catch (err) {}
    }

    return (<StyledAddItem finished={""}>
        <AddItemForm onSubmit={submit}>
            <TextField 
                name="title"
                size="small"
                type="normal"
                value={formState.title}
                onChange={handleChange}
                label="Title"
                required={true}
                inputProps={{maxLength: 15}}
            />
            <TextField 
                name="description"
                size="small"
                maxRows="2"
                value={formState.description}
                onChange={handleChange}
                label="Description"
                required={true}
                inputProps={{maxLength: 30}}
            />
            <TextField 
                name="deadline"
                type="datetime-local"
                size="small"
                value={formState.deadline}
                onChange={handleChange}
                required={true}
                error={dateError}
                helperText={dateError ? "Cant be added to the past" : ""}
                label="Deadline"
                inputProps={{
                    min: format(new Date(), 'yyyy-MM-dd')
                }}
            />
            {isAddingItem ? 
                <Spinner centered={true}/> :
                <SubmitButton type="submit">Add item</SubmitButton>
            }
        </AddItemForm>
    </StyledAddItem>)
}