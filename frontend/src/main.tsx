import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <MantineProvider>
                <App />
            </MantineProvider>
        </AuthProvider>
  </React.StrictMode>,
)
