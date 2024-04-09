import React from 'react'
import router from './utils/routes'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './style.scss'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <RouterProvider router={router} />
)