import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddPage from './pages/AddPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/addproduct',
        element: <AddPage />
    }
])

export default router