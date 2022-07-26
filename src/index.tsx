import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { extendedApiSlice } from './features/lists/listSlice';

store.dispatch(extendedApiSlice.endpoints.getLists.initiate())

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

// 14 hodin