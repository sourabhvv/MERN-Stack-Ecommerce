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
import Cart from "./components/user/Cart";
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
          <Route path="/" component={Login} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
       
         </div>
     
       </Router>);
   }

   const token = localStorage.getItem('token');

   return (
    <>
     {!!token ?userRoute() : authRoute()}
    </>
   )


   
 
}


