import React from 'react'
import { AppContent, Heading } from '../styles/App.style'

export const HomePage = () => {
    return (<AppContent>
        <Heading>Simple ToDo App</Heading>
        This is simple todo app. <br/>
        <span>
            For more information&nbsp;
            <a style={{display: "inline-block"}} href="https://github.com/overjoyedbrass/todo-app">click here</a>
        </span>
    </AppContent>)
} 