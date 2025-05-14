import RegisterForm from "../pages/user/register";
import { useAuth,AuthProvider } from "../../context_api/context_api";
import MobileMenu from "../component/mobile_menu";
import Login from "../pages/user/login";
import ENV_File from "../../config/config.js";
import Home_page from "../pages/user/home.jsx";
import Navbar from "../component/navbar.jsx";
import AdminProductForm from '../pages/admin/admin_product.jsx'
import AppwriteService from "../../appwrite/appwrite.js";
import AdminProductDetail from "../pages/admin/admin_preview.jsx";
import AdminEditForm from "../pages/admin/admin_edit.jsx";
import Product_2 from '../pages/admin/admin_page.jsx'
import SecondSection from '../component/second_slider.jsx'
import SliderSection from "../component/ss_special_slide.jsx";
import Header from "../component/header.jsx";
import ProductPage from "../pages/product/product_page.jsx";
import SwipeImageViewer from "../component/image_swip.jsx";
import FeaturedCollection from "../component/festure_collection.jsx";
import SSSpecialCarousel from "../component/ss_special.jsx";
import CartPage from "../pages/user/cart.jsx";
import ProductDetail from "../pages/product/product_detail.jsx";
import Button from "../component/button.jsx";
import OrderConfirmation from "../pages/user/order_confimation.jsx";
import BottomMenuBar from "../component/bottom_menu.jsx";
import Container from "../component/container.jsx";
import PayNow from "../pages/user/payment_page.jsx";
import Wish_List from '../pages/user/wishlist.jsx'
import Logout from "../pages/user/logout.jsx";
import AddressForm from "../pages/user/address_form.jsx";
import AccountPage from "../pages/user/account.jsx";
import AuthGuard from "../component/auth_check.jsx";
import OrderPage from "../pages/user/order_confimation.jsx";
import AddressCard from "../component/address_component.jsx";
import Address_form from "../component/address_form_component.jsx";
import ForgotPassword from "../pages/user/ForgotPassword.jsx";
import ResetPassword from "../pages/user/ResetPassword.jsx";

export{
    RegisterForm,
    useAuth,
    MobileMenu,
    Login,
    ENV_File,
    Home_page,
    Navbar,
    AdminProductForm,
    AppwriteService,
    AdminProductDetail,
    AdminEditForm,
    Product_2,
    SecondSection,
    SliderSection,
    Header,
    ProductPage,
    SwipeImageViewer,
    FeaturedCollection,
    SSSpecialCarousel,
    CartPage,
    ProductDetail,
    Button,
    PayNow,
    OrderConfirmation,
    BottomMenuBar,
    Container,
    AuthProvider,
    Wish_List,
    Logout,
    AddressForm,
    AccountPage,
    AuthGuard,
    OrderPage,
    AddressCard,
    Address_form,
    ForgotPassword,
    ResetPassword,
    
    


    


}