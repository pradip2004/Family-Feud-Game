import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import LivePage from './pages/LivePage.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/admin',
        element: <AdminPage />
      },
      {
        path: '/live',
        element: <LivePage />
      }
    ]
  },
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/auth/login',
    element: <LoginPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} >
      <App />
    </RouterProvider >
  </StrictMode>,
)
