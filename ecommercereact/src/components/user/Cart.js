import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Cart(){
	 const [totalPrice,setotalPrice]= useState("");
     const [products,setProducts] = useState([]);
     const userId = localStorage.getItem('id');
     const [Data,SetData]=useState([]); 
      const formData = new URLSearchParams();
     
   
     useEffect(() => {
    fetch(`http://localhost:5000/cart/${userId}`)
      .then(response => response.json())
      .then(data =>{
         setotalPrice(data.total_price)
      	setProducts(data.products)
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);


 
     
     function DeleteProduct(product_id){
        console.log(product_id)
          formData.append('product_id', product_id);
        axios.post(`http://localhost:5000/cart/delete-product/${userId}`,formData,
            {
         headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to URL encoded
            },
    }
      ).then(function(response){
      if(response.status==200){

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
          
       fetch(`http://localhost:5000/cart/${userId}`)
      .then(response => response.json())
      .then(data =>{
         setotalPrice(data.total_price)
        setProducts(data.products)
      })
      .catch(error => console.error('Error fetching products:', error));

           
        
          
      }
      }).catch(function(error){
           toast.error('😟 error occured!', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
      });

   
     }


	return(<>

	<div className="rounded-lg border border-gray-100 bg-white shadow-md container mx-auto p-6 lg ">
     <ToastContainer />
             <div className="flex font-sans mt-3">
                   <div className="flex-none w-full h-100 relative"> 
                   <div class="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                   MY Cart
                   </div>

                   <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                        <li class="w-full">
                          <button id="faq-tab" data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="true" class="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500">Top products</button>
                        </li>
                        <li class="w-full">
                          <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" class="inline-block w-full p-4 rounded-tr-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300">Top Customers</button>
                        </li>
                   </ul>

                   <div className="border-t border-gray-200 dark:border-gray-600">
                         <div class="pt-4" id="faq" role="tabpanel" aria-labelledby="faq-tab">
                             <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

                                 {products.map(product=>(

                                   <li id={`productlist${product._id}`} class="py-3 sm:py-4">
                                      <div class="flex items-center justify-between">

                                           <div class="flex items-center min-w-0">
                                            <img class="flex-shrink-0 w-100 h-40" src={`http://localhost:5000/${product.image}`}  alt="imac image"/>
                                          <div class="ml-3">
                                          
                                         <p class="font-medium text-gray-900 truncate dark:text-white">
                                          {product.product_name}
                                         </p>
                                      <div class="flex items-center justify-end flex-1 text-sm text-green-500 dark:text-green-400">
                                           
                                        <span class="ml-2 text-gray-500"> {product.description}</span>
                                       </div>
                                    </div>
                                 </div>

                                <div className="flex-2">
                                	<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <div class="_3dY_ZR"><button class="_23FHuj" disabled=""> – </button><div class="rounded-md  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"><input type="text" class="w-9 mr-2" value={product.quantity}/></div><button class="_23FHuj"> + </button></div> {product.price}
                                   </div>
                                   <div className="">
                                   <button onClick={() => DeleteProduct(product._id)} type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                                    </button>
                                    </div>
                                </div>
                                 </div>

                                   </li>
                                 	))}

                             </ul>
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                             <li  class="py-3 sm:py-4">
                              <div class="flex items-center justify-between">
                               <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                	totalPrice : {totalPrice}
                                </div>
                              </div>
                             </li>
                            </ul>

                         </div>
                   </div>
                      <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                        <li class="w-full">

                          <button id="faq-tab" data-tabs-target="#faq" type="button" role="tab" aria-controls="faq" aria-selected="true" class="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500">  totalPrice : {totalPrice}</button>
                        </li>
                        
                   </ul>
                   </div>
              </div>
    </div>
	</>);
}

export default Cart