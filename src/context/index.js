"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export const GlobalContext = createContext(null);
export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};
const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

export default function GlobalState({ children }) {
  const [showNavModel, setShowNavModel] = useState(false);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });

  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
     collage: "",
    phoneno: "",
  
  });
  
  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );
  const router = useRouter();
  const pathName = usePathname();
  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};

      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);
  useEffect(() => {
    if (
      pathName !== "/register" &&
      !pathName.includes("product") &&
      pathName !== "/" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName) > -1
    )
      router.push("/login");
  }, [user, pathName]);
  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);
  return (
    <GlobalContext.Provider
      value={{
        allOrdersForAllUsers, setAllOrdersForAllUsers,
        orderDetails, setOrderDetails,
        allOrdersForUser, setAllOrdersForUser,
        checkoutFormData, setCheckoutFormData,
        addresses, setAddresses,
        addressFormData, setAddressFormData,
        cartItems,
        setCartItems,
        showCartModal,
        setShowCartModal,
        user,
        setUser,
        showNavModel,
        setShowNavModel,
        isAuthUser,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        setIsAuthUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
