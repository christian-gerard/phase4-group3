import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from '../pages/Error'
import Auth from '../components/auth/Auth'
import NewEntry from '../pages/NewEntry'
import Entries from '../pages/Entries'
import Entry from '../pages/Entry'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Auth />,
                index: true
            },  
            {
                path: '/auth', 
                element: <Auth />
            },
            {
                path: '/new',
                element: <NewEntry />
            },
            {
                path: '/view',
                element: <Entries />
            },
            {
                path: '/view/:id',
                element: <Entry />
            },
    ]}
])

export default router