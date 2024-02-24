import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Dashboard from './Dashboard';
import Product from './Product';
import Chats from './Chats';
function admin() {
  return (

    <Router>
      <div className="flex h-screen bg-gray-100">
        
        <main className="flex-1 p-4 mt-10">
          <div className="bg-white">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/products" component={Product} />
              <Route path="/chats" component={Chats} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default admin 