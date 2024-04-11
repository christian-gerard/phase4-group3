import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './utils/routes'
import UserProvider from './context/UserContext'
import './style.scss'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
)