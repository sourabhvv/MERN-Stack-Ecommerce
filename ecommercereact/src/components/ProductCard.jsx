import React from 'react';
import { Link } from "react-router-dom";
import Addtocart from "./Addtocart";
const ProductCard = ({ image, title, description, stock, price,addToCart,id }) => {
  return (
    <div className="group my-3 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link to={`/View/${id}`} className="relative block overflow-hidden rounded-xl">
        <img className="w-full h-60 object-cover transition-transform duration-300 transform group-hover:scale-105" src={`http://localhost:5000/${image}`} alt={title} />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-lg font-semibold">View Details</span>
        </div>
      </Link>
      <div className="p-5">
        <h5 className="text-xl tracking-tight text-slate-900 mb-2">{title}</h5>
        <p className="text-l text-slate-900">₹{price}</p>
        <p className="text-1xl text-red-900">{stock < 1 ? "Out of stock" : ""}</p>
        <div className="flex justify-between mt-4">
          <Addtocart product_id={id} />
          <Link to={`/View/${id}`} className="py-2.5 px-5 h-12 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
