import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
// import { HelmetProvider } from "react-helmet-async";
import '@/css/index.css'

export function render(_url: string) {
    const html = renderToString(
        <StrictMode>
            <App url={_url} />
        </StrictMode>,
    )
    return { html }
}