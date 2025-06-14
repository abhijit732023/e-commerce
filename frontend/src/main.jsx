import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Invoice,
  AddressPage,
  CartWishlistProvider,
  FAQ,
  TermsConditions,
  RefundReturn,
  AboutUs,
  ContactUs, ResetPassword, ForgotPassword, OrderPage, AuthGuard, AccountPage, AddressForm, Wish_List, AuthProvider, PayNow, OrderConfirmation, ProductDetail, CartPage, ProductPage, Product_2, AdminEditForm, AdminProductDetail, AdminProductForm, Home_page, Login, RegisterForm, Logout,
  AdminOrderPage,AdminEditProduct,AdminAuthGuard
} from './FilesPaths/all_path.js';
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
      <AdminAuthGuard>
        <AdminProductForm />
      </AdminAuthGuard>
    ),
  },
  {
    path: '/admin/preview',
    element: (
      <AuthGuard>
        <AdminProductDetail />

      </AuthGuard>
    ),
  },
  {
    path: '/admin/edit/:productId',
    element: (
      <AuthGuard>
        <AdminEditForm />
      </AuthGuard>
    ),
  },
  {
    path: '/admin/add',
    element: (
      <AdminAuthGuard>
        <Product_2 />
      </AdminAuthGuard>
    ),
  },
  {
    path: '/product',
    element: (
      <AuthGuard>
        <ProductPage />
      </AuthGuard>
    ),
  },
  {
    path: '/cart/:userid',
    element: (
      <AuthGuard>
        <CartPage />
      </AuthGuard>
    ),
  },
  {
    path: '/product/:productId',
    element: (
      <AuthGuard>
        <ProductDetail />
      </AuthGuard>
    ),
  },
  {
    path: '/order',
    element: (
      <AuthGuard>
        <OrderConfirmation />
      </AuthGuard>
    ),
  },
  {
    path: '/cart/:userid/:amount',
    element: (
      <AuthGuard>
        <PayNow />

      </AuthGuard>
    ),
  },
  {
    path: '/cart',
    element: (
      <AuthGuard>
        <CartPage />
      </AuthGuard>
    ),
  },
  {
    path: '/wishlist/:userid',
    element: (
      <AuthGuard>
        <Wish_List />
      </AuthGuard>
    ),
  },

  {
    path: '/address',
    element: (
      <AuthGuard>
        <AddressForm />
      </AuthGuard>
    ),
  },
  {
    path: '/account/:userid',
    element: (
      <AuthGuard>
        <AccountPage />

      </AuthGuard>
    ),
  },
  {
    path: '/order/:userid',
    element: (
      <AuthGuard>
        <OrderPage />

      </AuthGuard>
    ),
  },
  {
    path: '/reset-password/:token',
    element: (
      <ResetPassword />

    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ForgotPassword />

    ),
  },
  {
    path: '/terms-and-conditions',
    element: (
      <TermsConditions />

    ),
  },
  {
    path: '/about-company',
    element: (
      <AboutUs />

    ),
  },
  {
    path: '/faq',
    element: (
      <FAQ />

    ),
  },
  {
    path: '/refund-and-returns',
    element: (
      <RefundReturn />

    ),
  },
  {
    path: '/contact-us',
    element: (
      <ContactUs />

    ),
  },
  {
    path: '/address/:userid',
    element: (
      < AddressPage/>

    ),
  },

  {
    path: '/admin/orders',
    element: (
<AdminAuthGuard>      
  < AdminOrderPage/>
</AdminAuthGuard>
    ),
  },
  {
    path: '/admin/edit/product',
    element: (
     <AdminAuthGuard>
       < AdminEditProduct/>
     </AdminAuthGuard>

    ),
  }
])


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartWishlistProvider>

    <StrictMode>

      <RouterProvider router={router} />

    </StrictMode>,
    </CartWishlistProvider>
  </AuthProvider>
)
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { OrderPage, AccountPage, AddressForm, Wish_List, AuthProvider, PayNow, OrderConfirmation, ProductDetail, CartPage, ProductPage, Product_2, AdminEditForm, AdminProductDetail, AdminProductForm, Home_page, Login, RegisterForm, Logout } from './FilesPaths/all_path.js';
// import './index.css';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home_page />,
//   },
//   {
//     path: '/register',
//     element: <RegisterForm />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/admin',
//     element: <AdminProductForm />,
//   },
//   {
//     path: '/admin/preview',
//     element: <AdminProductDetail />,
//   },
//   {
//     path: '/admin/edit/:productId',
//     element: <AdminEditForm />,
//   },
//   {
//     path: '/admin/add',
//     element: <Product_2 />,
//   },
//   {
//     path: '/product',
//     element: <ProductPage />,
//   },
//   {
//     path: '/cart/:userid',
//     element: <CartPage />,
//   },
//   {
//     path: '/product/:productId',
//     element: <ProductDetail />,
//   },
//   {
//     path: '/order',
//     element: <OrderConfirmation />,
//   },
//   {
//     path: '/cart/:userid/:amount',
//     element: <PayNow />,
//   },
//   {
//     path: '/cart',
//     element: <CartPage />,
//   },
//   {
//     path: '/wishlist',
//     element: <Wish_List />,
//   },
//   {
//     path: '/address',
//     element: <AddressForm />,
//   },
//   {
//     path: '/account',
//     element: <AccountPage />,
//   },
//   {
//     path: '/order',
//     element: <OrderPage />,
//   },
// ]);

// createRoot(document.getElementById('root')).render(
//   <AuthProvider>
//     <StrictMode>
//       <RouterProvider router={router} />
//     </StrictMode>
//   </AuthProvider>
// );