import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { ThemeProvider } from "@/components/theme-provider"
// import Dashboard from './Pages/Dashboard'
// import SmoothScrollWrapper from './Components/SmoothScrollWrapper'
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <Signup /> },
  // { path: "/dashboard", element: <Dashboard /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {/* <SmoothScrollWrapper> */}
      <RouterProvider router={router} />
    {/* </SmoothScrollWrapper> */}
    </ThemeProvider>
  </StrictMode>
)