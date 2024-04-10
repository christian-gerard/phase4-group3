import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './utils/routes'
import ContextProvider from './context/ContextProvider'
import './style.scss'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
)