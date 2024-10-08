import React from "react";
import { Route, Routes } from "react-router-dom";
import Template from "./pages/_TemplatePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HistoryPage from "./pages/HistoryPage";
import FavouritePage from "./pages/FavouritePage"
import CartPage from "./pages/CartPage";
import AddItemPage from "./pages/AddItemPage";
import AdminPage from "./pages/AdminPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import OrderPage from "./pages/OrderPage";
import ViewAllOrdersPage from "./pages/ViewAllOrdersPage";
import ViewActiveOrdersPage from "./pages/ViewActiveOrdersPage";
import ViewSalesPage from "./pages/ViewSalesPage";


function App() {
  return (
      <Routes >
        <Route path="/" element={<Template />} >
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="favourite" element={<FavouritePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="cart" element={<CartPage />} /> 
          <Route path="confirmation" element={<ConfirmationPage />} />
          <Route path="add-item" element={<AddItemPage />} />   
          <Route path="update-item"  >
            <Route path=":id" element={<AddItemPage />} />
          </Route>
          <Route path="admin" element={<AdminPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="view-all-orders" element={<ViewAllOrdersPage />} />
          <Route path="view-active-orders" element={<ViewActiveOrdersPage />} />
          <Route path="/view-sales" element={<ViewSalesPage />} />
        </Route>        
      </Routes>
  );
}

export default App;
