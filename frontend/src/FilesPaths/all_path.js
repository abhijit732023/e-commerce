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
import ProductPage from "../pages/user/product_page.jsx";
import SwipeImageViewer from "../component/image_swip.jsx";
import FeaturedCollection from "../component/festure_collection.jsx";
import SSSpecialCarousel from "../component/ss_special.jsx";
import CartPage from "../pages/user/cart.jsx";
import ProductDetail from "../pages/user/product_detail.jsx";
import Button from "../component/button.jsx";
import ForgotPassword from "../pages/user/forget_password.jsx";
import ResetPassword from "../pages/user/reset.jsx";
import OrderConfirmation from "../pages/user/order_confimation.jsx";
import PaymentPage from "../pages/user/payment_page.jsx"; 
import BottomMenuBar from "../component/bottom_menu.jsx";
import Container from "../component/container.jsx";

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
    ForgotPassword,
    ResetPassword,
    OrderConfirmation,
    PaymentPage,
    BottomMenuBar,
    Container,
    AuthProvider
    
    


    


}