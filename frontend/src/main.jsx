import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ProductPage,Product_2,AdminEditForm,AdminProductDetail,AdminProductForm, Home_page,Login ,RegisterForm} from './FilesPaths/all_path.js';
import { AuthProvider } from '../context_api/context_api.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Home_page />
    ),
  },
  {
    path: '/register',
    element: (
      <RegisterForm />
    ),
  },
  {
    path: '/login',
    element: (
      <Login />
    ),
  },
  {
    path: '/admin',
    element: (
      <AdminProductForm />
    ),
  },
  {
    path: '/admin/preview',
    element: (
      <AdminProductDetail />
    ),
  },
  {
    path: '/admin/edit/:productId',
    element: (
      <AdminEditForm />
    ),
  },
  {
    path: '/admin/add',
    element: (
      <Product_2 />
    ),
  },
  {
    path: '/product',
    element: (
      <ProductPage />
    ),
  }
])


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>

<RouterProvider router={router} />

</StrictMode>,
  </AuthProvider>
)
