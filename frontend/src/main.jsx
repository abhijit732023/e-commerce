import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {AuthProvider,PaymentPage,OrderConfirmation,ResetPassword,ForgotPassword,ProductDetail,CartPage,ProductPage,Product_2,AdminEditForm,AdminProductDetail,AdminProductForm, Home_page,Login ,RegisterForm} from './FilesPaths/all_path.js';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Home_page />
      </AuthProvider>
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
  },
  {
    path: '/cart/:userid',
    element: (
      <CartPage />
    ),
  },
  {
    path: '/product/:productId',
    element: (
      <ProductDetail />
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ForgotPassword />
    ),
  },
  {
    path: '/reset-password/:token',
    element: (
      <ResetPassword />
    ),
  },
  {
    path: '/order',
    element: (
      <OrderConfirmation />
    ),
  },
  {
    path: '/payment',
    element: (
      <PaymentPage />
    ),
  },
  {
    path: '/cart',
    element: (
      <CartPage />
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
