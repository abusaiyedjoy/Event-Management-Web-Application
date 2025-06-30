import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Provider/AuthProvider.jsx';
import {Toaster} from "react-hot-toast"
import router from './router/router.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <Toaster/>
      <RouterProvider router={router} />
    </StrictMode>,
  </AuthProvider> 
)
