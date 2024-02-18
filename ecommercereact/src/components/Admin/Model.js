import {React,useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Modal() {
  const [selectedFile,SetselectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productname,setProductname] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [description,setDescription] = useState("");

   const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!productname || !description || !category || !price || !stock || !selectedFile){

       toast.error('Please fill out all the for!', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('productname', productname);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock', stock);
   
 
    await axios.post("http://localhost:5000/product/create-product",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function(response){
      if(response.status==201){
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
           
        
           setShowModal(false);
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

     };
  
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}>
       Add Product
      </button>

      <ToastContainer />

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   Add Product
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit}>

                 <div className="relative p-4 flex-auto">
                   <div className="">
                   <div className="grid grid-cols-2 gap-9"></div>

                   <div className="grid grid-cols-2 gap-9">
                   <label for="productimage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                   <input type="file" name="productimage" id="productimage" onChange={(e)=>SetselectedFile(e.target.files[0])} accept="image/*" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="true"/>
                  </div>

                 <div>
                  <label for="productname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input type="text" name="productname" value={productname} onChange={(e)=>setProductname(e.target.value)} id="productname" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product Name" required="true"/>
                 </div>
   
                <div>
                 <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                 <input type="text" name="category" id="category" value={category}  onChange={(e)=>setCategory(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Category" required="true"/>
                 </div>

    
    
     <div>
      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
      <input type="number" name="price" value={price}   onChange={(e)=>setPrice(e.target.value)}   id="price" min="0" step="0.01" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Price" required="true"/>
    </div>

    <div>
      <label for="stock" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
      <input type="number" name="stock" value={stock}  onChange={(e)=>setStock(e.target.value)} id="stock" min="0" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Stock" required="true"/>
    </div>

    
    <div>
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea name="description" id="description" value={description}  onChange={(e)=>setDescription(e.target.value)} rows="3" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product Description" required="true"></textarea>
    </div>

  </div>
</div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    value="submite"
                  >
                    Save Changes
                  </button>
                </div>
                </form>
              </div>
              
            </div>
          </div>
          
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
