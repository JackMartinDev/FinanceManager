import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { AuthProvider } from './context/AuthContext.tsx';
import AxiosErrorHandler from './components/Error/AxiosErrorHandler.tsx';

const theme = createTheme({
  cursorType: 'pointer',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <MantineProvider theme={theme}>
                <AxiosErrorHandler>
                    <App />
                </AxiosErrorHandler>
            </MantineProvider>
        </AuthProvider>
    </React.StrictMode>,
)
