import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent, Spinner, Heading } from '../../styles/App.style'
import { SubmitButton, InputField, AddListForm } from '../../styles/Form.style'
import { usePostListMutation, CreateListResponse } from './listSlice'

type initialState = {
    name: "",
}
export const CreateList = () => {
    const [formState, setFormState] = React.useState<initialState>({name: ""})

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const [createList, { isLoading }] = usePostListMutation()
    const navigate = useNavigate()

    async function submit(e: any){
        e.preventDefault()
        try {
            const response = await createList(formState.name) as unknown as { data: CreateListResponse}
            const newId = response.data.id

            setFormState({name: ""})
            navigate(`/list/${newId}`)
        } catch (err) {
            console.log(err)
        }
    }    

    return (
    <AppContent>
        <Heading>Create new ToDo list</Heading>
        <AddListForm onSubmit={submit}>
            <InputField 
                size="small" 
                name="name"
                variant="standard"
                label="Name"
                value={formState.name}
                onChange={handleChange}
                required={true}
                inputProps={{maxLength: 10}}
            />
            { isLoading ? <Spinner /> :
            <SubmitButton 
                variant="contained"
                color="primary"
                type="submit"
            >
                Create list
            </SubmitButton>}
        </AddListForm>
    </AppContent>)
}