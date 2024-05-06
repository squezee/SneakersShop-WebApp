import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const ReactDOM = require("react-dom/client");
const React = require("react");
//const Container = require('./components/container.jsx');
import Main from './components/main.jsx';
import Catalog from './components/catalog.jsx';
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import Busket from "./components/busket.jsx";
import Product from "./components/product.jsx";
import PassRecover from "./components/passRecover.jsx";
import ProfileBusket from "./components/profileBusket.jsx";
import Orders from "./components/orders.jsx";
import AdminPanelProductsEditor from "./components/adminPanelProductsEditor.jsx";
ReactDOM.createRoot(document.getElementById('app'))
.render(
  <Router>
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/catalog" >
                    <Route path=":category" element={<Catalog/>}></Route>
                </Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/busket" element={<Busket/>}></Route>
                <Route path="/product" >
                    <Route path=":id" element={<Product/>}></Route>
                </Route>
                    <Route path="/profile/passRecover" element={<PassRecover/>}></Route>
                    <Route path="/profile/busket" element={<ProfileBusket/>}></Route>
                    <Route path="/profile/orders" element={<Orders/>}></Route>
                    <Route path="/admin/productsManager" element={<AdminPanelProductsEditor/>}></Route>
                    
            </Routes>
        </div>
    </Router>
    
);