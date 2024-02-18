import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Dashboard from './Dashboard';
import Product from './Product';

function admin() {
  return (

    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="fixed z-80 bg-white text-black w-64 h-full p-6 rounded shadow">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          {/* Add navigation links here */}
          <nav className="mt-8">
            <ul>
              <li className="mb-2">
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">Products</span>
                </Link>
                <ul className="py-2 space-y-2">
                  <li>
                    <a
                      href="https://flowbite-admin-dashboard.vercel.app/layouts/stacked/"
                      className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Stacked
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://flowbite-admin-dashboard.vercel.app/layouts/sidebar/"
                      className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Sidebar
                    </a>
                  </li>
                </ul>
              </li>
              {/* Add more navigation links */}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
                <div className="ml-10"></div>
        <div className="ml-10"></div>
        <div className="ml-10"></div>
        <div className="ml-10"></div>
        <div className="ml-10"></div>

        <div className="ml-10"></div>
        <main className="flex-1 p-4 mt-10">
          <div className="bg-white">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/products" component={Product} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default admin 