import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
async function addToCart(product_id) {
   const token = localStorage.getItem('token');

   // Assuming you have user_id stored in localStorage
   const user_id = localStorage.getItem('id'); // Adjust this line according to your storage key

    const formData = new URLSearchParams();
    
    formData.append('product_id', product_id);
    formData.append('quantity', 1);
    try {
        const response = await axios.post(`http://localhost:5000/cart/addtocart/${user_id}`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status === 201) {

            toast(`👌 ${response.data.message}!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
            
        }
        else{
             toast(`👌 ${response.data.message}!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
        }
    } catch (error) {
        toast(`👌 Out of Stock!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
    }
}

function AddToCart({ product_id }) {
    return (
        <button onClick={() => addToCart(product_id)} type="button" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 h-12 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
        </button>
    );
}

export default AddToCart;
