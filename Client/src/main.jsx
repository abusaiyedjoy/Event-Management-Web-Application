import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Provider/AuthProvider.jsx';
import { Toaster } from "react-hot-toast"
import router from './router/router.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  </AuthProvider>
)
