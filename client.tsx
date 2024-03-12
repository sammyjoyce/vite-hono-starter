import React from 'react'
import ReactDOM from 'react-dom/client'
import {IndexPage} from './views'
import './views/index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <IndexPage />
    </React.StrictMode>,
)