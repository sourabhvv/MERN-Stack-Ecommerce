import React from "react";
import "./styles.css";
import "./index.css";
import About from "./components/About";
import Shop from "./components/Shop";
import Nav from "./components/Nav";
import Home from "./components/Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import View from "./components/View";

import admin from "./components/Admin/admin";
import Dashboard from "./components/Admin/Dashboard";
import Chats from "./components/Admin/Chats";
import Product from "./components/Admin/Product";
import AdminNavbar from "./components/Admin/Navbar";



import Cart from "./components/user/Cart";
import Chat from "./components/Chat/Chat";
import UserSettings from "./components/user/UserSettings";
export default function App() {
  
   
   const userRoute = () =>{
    return(
       <Router>
          <div className="App">
           <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/shop" component={Shop} />
          <Route path="/login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/View/:id" component={View}/>
          <Route path="/admin" component = {admin} />
          <Route path="/cart" component = {Cart} />
          <Route path="/UserSettings" component ={UserSettings}/>
          <Route path="/chat/:id" component = {Chat}/>
        </Switch>
       
         </div>
     
       </Router>
    );
     
   }

   const adminRoute = () =>{
    return(
       <Router>
          <div className="App">
           <AdminNavbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/chats/:id" component={Chats} />
          <Route path="/Products" component={Product} />
        </Switch>
       
         </div>
     
       </Router>
    );
     
   }

   const authRoute = () =>{
    return (
     <Router>
          <div className="App">
          
        <Switch>
          <Route path="/SignUp" component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
       
         </div>
     
       </Router>);
   }

   const token = localStorage.getItem('token');
   const userType = localStorage.getItem('userType');

   if(userType==='admin'){
      return (
    <>
     {!!token ?adminRoute() : authRoute()}
    </>
   )
   }else{
      return (
    <>
     {!!token ?userRoute() : authRoute()}
    </>
   )
   }
  


   
 
}


