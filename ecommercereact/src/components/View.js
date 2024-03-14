import {React,useState,useEffect} from 'react'
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";



function View() {
  const [product,setProducts] = useState([]);
  const {id} = useParams();
  const token = localStorage.getItem('token');

 
  useEffect(() => {
    fetch(`http://localhost:5000/product/get-product/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => setProducts(data[0]))
      .catch(error => console.error('Error fetching products:', error));
  }, []);



 

 
  const [viewD ,SetviewD] = useState(false);

  const ThreeD = () =>{
  return(
        <iframe width="500"  className="absolute inset-0 w-full h-full object-cover"  height="500" src="https://embed.studio.binkies3d.com/live3d/65c214654f46e300541daab8" frameborder="0" allowfullscreen></iframe>
    );
}

  const changeView = () =>{
    SetviewD(!viewD);
  }
  return (
    <>

     <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="rounded-lg border border-gray-100 bg-white shadow-md container mx-auto p-6">
      <div className="mt-10">.</div>

  <div className="flex font-sans mt-3 mt-10">
    <div className="flex-none w-80 h-100 relative"> 
    

    {viewD ? (<ThreeD/>) :(<img
        src={`http://localhost:5000/${product.image}`}
        alt=""
        width = "100%"
        loading="lazy"
      />)}



    </div>
    <form className="flex-auto p-2">
      <div className="flex flex-wrap">
        <h1 className="flex-auto text-lg font-semibold text-slate-900">
         {product.product_name}
        </h1>
        <div className="text-lg font-semibold text-slate-900">
         {product.price}
        </div>

        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          In stock :{product.stock} Left
        </div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
         Description: {product.description}        
         </div>
         
      </div>
      <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        <div class="space-x-2 flex text-sm">
          <label>
            <input class="sr-only peer" name="size" type="radio" value="xs" checked />
            <div class="w-full p-4 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-blue-900 peer-checked:text-white">
              Price : {product.price}
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="s" />
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              S
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="m" />
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              M
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="l" />
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              L
            </div>
          </label>
          <label>
            <input class="sr-only peer" name="size" type="radio" value="xl" />
            <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              XL
            </div>
          </label>
        </div>
      </div>
      <div class="flex space-x-4 mb-6 text-sm font-medium">
        <div class="flex-auto flex space-x-4">
          <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
            Buy now
          </button>
          <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
            Add to bag
          </button>
          <button  onClick={changeView} class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
          {viewD ? 'view 2D' : 'view 3D'}
          </button>
          <Link to={`/chat/${id}`} class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
            Chat with seller
          </Link>

        </div>
        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
          <svg width="20" height="20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </div>
      <p class="text-sm text-slate-700">
        Free shipping on all continental US orders.
      </p>

      
    </form>
   
  </div>

  
</div>
</div>


    <Footer/>
    </>
  )
}

export default View