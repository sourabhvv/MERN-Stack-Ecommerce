import {React,useState,useEffect } from 'react'
import "../styles.css";
import "../index.css";
import ImageSlider from "./ImageSlider";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const handleAddToCart =()=>{
  console.log("add to cart done");
}

function Home() {
 
 const [products,setProducts] = useState([]);


  {/*Get app products*/}
  useEffect(() => {
    fetch('http://localhost:5000/product/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);




  return (
    <>
    <div className="bg-gray-100 min-h-screen p-7">
    <ToastContainer />
        
      <div className="flex flex-col justify-center items-center p-10 space-y-4">
      </div>
      <div class="flex justify-center items-center space-x-4 bg-gray-200">
    
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M22 22L15.5 15.5M4.75 11.25a6.5 6.5 0 1 1 9.2 0c1.043 1.043 2.35 1.73 3.75 1.93l3.25 3.25"
              ></path>
            </svg>
          </button>
    <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center">
        <i class="fas fa-tag mr-2"></i>
        Price
    </span>
    <select class="border rounded-md px-2 py-1">
        <option value="option1">min</option>
        <option value="option2">under 40000</option>
        <option value="option3">under 50000</option>
    </select>

    <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center">
        <i class="fas fa-folder mr-2"></i>
        Category
    </span>
    <select class="border rounded-md px-2 py-1">
        <option value="option1">category</option>
        <option value="option2">phones</option>
        <option value="option3">headphones</option>
        <option value="option3">laptop</option>
    </select>

    <span class="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center">
        <i class="fas fa-star mr-2"></i>
        Brand
    </span>
    <select class="border rounded-md px-2 py-1">
        <option value="option1">apple</option>
        <option value="option2">samsung</option>
        <option value="option3">realme</option>
        <option value="option3">oneplus</option>
    </select>
</div>


      <div className="flex justify-center items-center h-3/4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (

           <div key={product._id} className="">

            <ProductCard
              image={product.image}
              title={product.product_name}
              description={product.description}
              price={product.price}
              addToCart={() => handleAddToCart(product._id)}
              id ={product._id}
              stock={product.stock}
            />
           </div>
         ))}

        </div>
      </div> 
  </div>
  
  <Footer/>
  
  </>
  )
}

export default Home