import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import Navbar from './components/Navbar';
import { HomePage } from './components/HomePage';

import { AppWrapper } from './styles/App.style'
import { CreateList } from './features/lists/CreateList';
import { AllLists } from './features/lists/AllLists';
import { AllItems } from './features/items/AllItems';
import { NotFound } from './components/NotFound';

function App() {
    return (
        <AppWrapper>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/list" element={<AllLists />} />
                    <Route path="/list/:id" element={<AllItems />} />
                    <Route path="/addlist" element={<CreateList />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AppWrapper>
    );
}



export default App;
