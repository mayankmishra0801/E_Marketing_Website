import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alogin from "./Components/Admin/Alogin";
import Dasboard from "./Components/Admin/Dasboard";
import './App.css';
import MiniDrawer from "./Components/Admin/Drawer";
import Userlogin from "./Components/User/Userlogin";
import Uregister from "./Components/User/Uregister";
import Uhome from "./Components/User/Uhome";
import Auserlist from "./Components/Admin/Auserlist";
// import Workerlist from "./Components/Admin/workerlist";
import Payment from "./Components/User/Payment";
import Product from "./Components/User/Product";
import Mycart from "./Components/User/Mycart";
// import Workerlogin from "./Components/Worker/Workerlogin";
// import Wdash from "./Components/Worker/Wdash";
// import Wdash1 from "./Components/Worker/Wdash1";
import PageAddress from "./Components/User/PageAddress";
import Productlist from "./Components/Admin/Productlist";
import Orderlist from "./Components/User/Orderlist";
import Success from "./Components/User/Sucess";
import OrderInfo from "./Components/User/OrderInfo";
import Torder from "./Components/Admin/Torder";
import View from "./Components/Admin/Vieworder";



function App() {

  return (
    <>

      <Router>
        <Routes>

          {/*------------------------------ Admin pages ------------------------------*/}

          <Route path="/Adminlogin" element={<Alogin />} />
          <Route path="/Dasboard" element={<Dasboard />} />
          <Route path="/Productlist" element={<Productlist />} />
          <Route path="/Auserlist" element={<Auserlist />} />
          <Route path="/Drawer" element={<MiniDrawer />} />
        
          {/* <Route path="/Workerlist" element={<Workerlist />} /> */}
        
          <Route path="/Torder" element = {<Torder/>}/>
          <Route path="/ViewOinfo" element={<View/>} />
          

          {/*------------------------------ user pages ------------------------------*/}

          <Route path="/" element={<Userlogin />} />
          <Route path="/Uregister" element={<Uregister />} />
          <Route path="/Home" element={<Uhome />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Mycart" element={<Mycart />} />
          <Route path="/Address" element={<PageAddress />} />
          <Route path="/Orderlist" element={<Orderlist />} />
          <Route path="/Success" element ={<Success/>}/>
          <Route path="/OrderInfo" element ={<OrderInfo/>}/>
 
          
          {/*------------------ Worker PAGES----------------------------- */}


          {/* <Route path="/Workerlogin" element={<Workerlogin />} />
          <Route path="/Wdash" element={<Wdash />} />
          <Route path="/Wlog" element={<Wdash1 />} /> */}

          <Route path="/Payment" element={<Payment />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
