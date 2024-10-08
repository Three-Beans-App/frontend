import axios from 'axios';
import React, { createContext, useContext, useState } from "react";
import { useUserData } from "../contexts/userContext"
import { useCartData } from './cartContext';
import { API_BASE_URL } from './variables';


const OrderDataContext = createContext(null);
const OrderDispatchContext = createContext(null);

export function useOrderData(){
   return useContext(OrderDataContext);
};

export function useOrderDispatch(){
    return useContext(OrderDispatchContext);
};

export default function OrderProvider({ children }){

    const [ userOrderHistory, setUserOrderHistory ] = useState([]);
    const [ order, setOrder ] = useState({});
    const { userId, userJwt } = useUserData();
    const [ allOrders, setAllOrders ] = useState([]);
    const [ activeOrders, setActiveOrders ] = useState([]);
    const { cartItems } = useCartData();
    const [ QRCodeValue, setQRCodeValue] = useState(localStorage.getItem('QR-code-value') || "")
    const [ QRorderStatus, setQRorderStatus] = useState(localStorage.getItem('QR-code-status') || "")
    

    // update QRCodeValue and store value to localStorage
    const storeQRCodeValue = (value) => {
        setQRCodeValue(value);
        localStorage.setItem('QR-code-value', value);
    }

    // update QRorderStatus and store value to localStorage
    const storeQRorderStatus = (value) => {
        setQRorderStatus(value);
        localStorage.setItem('QR-code-status', value);
    }

    // view all the order history by User id - user side
    const userViewAllOrders = async() => {
        try {

            const id = userId;
            const historyUrl=`${API_BASE_URL}/orders/user/${id}`;

            const response = await axios.get(historyUrl, {
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }
            });
            setUserOrderHistory(response.data.result);
        } catch (error) {
            console.error("Error fetching user order history: ", error);
        }
    }

    // user create a new order 
    const userCreateOrder = async({ guestUser, userId }) => {

        const cartItemsOrder = cartItems.map(item => ({
            itemId: item.item._id,
            quantity: item.quantity
        }));

        const orderDetail = {
            userId: userId,
            guestUser: guestUser,
            items: cartItemsOrder
        };
        
        try {
            const response = await axios.post(`${API_BASE_URL}/orders/`, orderDetail);
            setOrder(response.data.order);
            setUserOrderHistory(existHistory => [...existHistory, response.data.order])
            storeQRCodeValue(response.data.order._id)
            storeQRorderStatus(response.data.order.status)
        }catch(error) {
            console.error("Error user create order: ", error)
        }


    };

    // admin view all the orders
    const adminViewAllOrders = async() => {
        try {
           
            const response = await axios.get(`${API_BASE_URL}/orders/`,{
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }});
            setAllOrders(response.data.result);
            // storeSalesReport(response.data.result, getTotalPriceOfAllOrders)
        }catch(error) {
            console.error("Error user create order: ", error)
        }
    };

    // admin view all the active orders
    const adminViewActiveOrders = async() => {
        try{
            const response = await axios.get(`${API_BASE_URL}/orders/active`,{
                headers: {
                    'Authorization': `Bearer ${userJwt}`
                }});
            setActiveOrders(response.data.result);
        }catch(error) {
            console.error("Error user create order: ", error)
        }
    }
    


    // admin update order status
    const updateOrderStatus = async(id, status) => {
        try{
           
            const updateOrderUrl = `${API_BASE_URL}/orders/status/${id}`
            const response = await axios.patch(updateOrderUrl, 
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${userJwt}`
                    }
                }
            );

            // update status in local
            if (response.status === 200) {
                // update local values
                if (status === "completed" || status === "cancelled") {
                    setActiveOrders(activeOrders.filter(order => order._id !== id));
                } else {
                    setActiveOrders(activeOrders.map(order => order._id === id ? { ...order, status } : order));
                }
                setAllOrders(allOrders.map(order => order._id === id ? { ...order, status } : order));
            }

        }catch(error){
            console.error("Error user create order: ", error)
        }
    }


    return (
        <OrderDataContext.Provider value={{userOrderHistory, order, allOrders, activeOrders, QRCodeValue, QRorderStatus}}>
            <OrderDispatchContext.Provider 
            value={{ 
                userViewAllOrders,
                userCreateOrder, 
                adminViewAllOrders, 
                adminViewActiveOrders, 
                updateOrderStatus, 
            }}>
                {children}
            </OrderDispatchContext.Provider>
        </OrderDataContext.Provider>
    )
}

