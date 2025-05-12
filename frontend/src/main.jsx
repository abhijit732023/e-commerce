// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { OrderPage,AuthGuard, AccountPage, AddressForm, Wish_List, AuthProvider, PayNow, OrderConfirmation, ProductDetail, CartPage, ProductPage, Product_2, AdminEditForm, AdminProductDetail, AdminProductForm, Home_page, Login, RegisterForm, Logout } from './FilesPaths/all_path.js';
// import './index.css'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <AuthGuard>
//         <Home_page />
//       </AuthGuard>
//     ),
//   },
//   {
//     path: '/register',
//     element: (
//         <RegisterForm />

//     ),
//   },
//   {
//     path: '/login',
//     element: (
//       <Login />
//     ),
//   },
//   {
//     path: '/admin',
//     element: (
// <AuthGuard>     
//    <AdminProductForm />
// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/admin/preview',
//     element: (
// <AuthGuard>
// <AdminProductDetail />

// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/admin/edit/:productId',
//     element: (
// <AuthGuard>
//         <AdminEditForm />
// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/admin/add',
//     element: (
// <AuthGuard>      
//   <Product_2 />
// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/product',
//     element: (
// <AuthGuard>      
//   <ProductPage />
// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/cart/:userid',
//     element: (
// <AuthGuard>      
//   <CartPage />
// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/product/:productId',
//     element: (
// <AuthGuard>      
//   <ProductDetail />
// </AuthGuard>      
//     ),
//   },
//   {
//     path: '/order',
//     element: (
//       <AuthGuard>      
//         <OrderConfirmation />
//       </AuthGuard>
//     ),
//   },
//   {
//     path: '/cart/:userid/:amount',
//     element: (
//       <AuthGuard>
//         <PayNow />

//       </AuthGuard>
//     ),
//   },
//   {
//     path: '/cart',
//     element: (
//       <AuthGuard>
//         <CartPage />
//       </AuthGuard>
//     ),
//   },
//   {
//     path: '/wishlist',
//     element: (
//       <AuthGuard>
//         <Wish_List />
//       </AuthGuard>
//     ),
//   },

//   {
//     path: '/address',
//     element: (
//       <AuthGuard>
//         <AddressForm />
//       </AuthGuard>
//     ),
//   },
//   {
//     path: '/account',
//     element: (
//       <AuthGuard>
//         <AccountPage />

//       </AuthGuard>
//     ),
//   },
//   {
//     path: '/order',
//     element: (
//       <AuthGuard>
//         <OrderPage />

//       </AuthGuard>
//     ),
//   }
// ])


// createRoot(document.getElementById('root')).render(
//   <AuthProvider>
//     <StrictMode>

//       <RouterProvider router={router} />

//     </StrictMode>,
//   </AuthProvider>
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OrderPage, AccountPage, AddressForm, Wish_List, AuthProvider, PayNow, OrderConfirmation, ProductDetail, CartPage, ProductPage, Product_2, AdminEditForm, AdminProductDetail, AdminProductForm, Home_page, Login, RegisterForm, Logout } from './FilesPaths/all_path.js';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home_page />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminProductForm />,
  },
  {
    path: '/admin/preview',
    element: <AdminProductDetail />,
  },
  {
    path: '/admin/edit/:productId',
    element: <AdminEditForm />,
  },
  {
    path: '/admin/add',
    element: <Product_2 />,
  },
  {
    path: '/product',
    element: <ProductPage />,
  },
  {
    path: '/cart/:userid',
    element: <CartPage />,
  },
  {
    path: '/product/:productId',
    element: <ProductDetail />,
  },
  {
    path: '/order',
    element: <OrderConfirmation />,
  },
  {
    path: '/cart/:userid/:amount',
    element: <PayNow />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/wishlist',
    element: <Wish_List />,
  },
  {
    path: '/address',
    element: <AddressForm />,
  },
  {
    path: '/account',
    element: <AccountPage />,
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);