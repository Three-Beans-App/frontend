import React from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/pages/AdminPage.css"
import { useUserData } from '../contexts/userContext';

export default function AdminPage(){

    const { isAdmin } = useUserData();

    const navigate = useNavigate();


    // navigateion route
    const handleNavigate = (path) => {
        navigate(path)
    }

       // if this page not the admin user return null
    if (!isAdmin) {
        return null;
    }

    return (
        <div id="admin-container">
            <div id="admin-sub-container">
               
                    <button className="nav-btn" onClick={()=> handleNavigate("/add-item")}>Add New Items</button>
            
                    <button className="nav-btn" onClick={()=> handleNavigate(`/menu`)}>Update Current Items</button>
               
                    <button className="nav-btn" onClick={()=> handleNavigate("/view-all-orders")}>View All Orders</button>
            
                    <button className="nav-btn" onClick={()=> handleNavigate("/view-active-orders")}>View Active Orders</button>
            
                    <button className="nav-btn" onClick={()=> handleNavigate("/view-sales")}>View Sales</button>
              
            </div>
        </div>
    )
}