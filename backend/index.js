import config from "./config/config.js";
import user_register_model from "./models/user_model/regster_model.js";
import Register_Login_Router from "./routes/user_route/user_register_login_route.js";
import product_add_model from "./models/admin_model/product_add_model.js";
import Product_add_route from "./routes/admin_route/product_add_route.js";
import Product_route_2 from "./routes/admin_route/product_2_route.js";
import Product_model_2 from './models/admin_model/product_model_2.js'
import Order from './models/user_model/order_model.js'
import Order_route from "./routes/user_route/order_route.js";
import Payment_route from "./routes/user_route/payment_route.js";
import Wishlist_model from "./models/user_model/wishlist_model.js";
import Wishlist_route from "./routes/user_route/wishlist_route.js"
import Address_model from "./models/user_model/address_model.js";
import Address_route from "./routes/user_route/address_route.js";

export{
    config,
    user_register_model ,
    Register_Login_Router,
    product_add_model,
    Product_add_route,
    Product_route_2,
    Product_model_2,
    Order,
    Order_route,
    Payment_route,
    Wishlist_route,
    Wishlist_model,
    Address_model,
    Address_route

}