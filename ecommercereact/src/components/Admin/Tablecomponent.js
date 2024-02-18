import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tablecomponent({products}) {
  const [id ,setId]= useState("");
  const [product,setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile,SetselectedFile] = useState(null);
  const [productname,setProductname] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const [stock,setStock] = useState("");
  const [description,setDescription] = useState("");

 function DeleteProduct(id) {
    fetch(`http://localhost:5000/product/delete-product/${id}`)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        toast(`${data.message}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        const rowToRemove = document.getElementById(`product-${id}`);
                        if (rowToRemove) {
                            rowToRemove.remove();
                        }
                    });
            } else {
                response.json()
                    .then(errorData => {
                        toast.error(`${errorData.message}`, {
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
        });
}


 
 const handleSubmit = async(e)=>{
     e.preventDefault();
      const formData = new URLSearchParams();
      if(selectedFile){
           formData.append('image', selectedFile);
      }
    formData.append('productname', productname);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('id',id);


    await axios.post(`http://localhost:5000/product/update-product/${id}`,formData,{
         headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to URL encoded
            },
    }).then(function(response){
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
           
           
           setShowModal(false);
      }
      }).catch(function(error){
           toast.error(`${error}`, {
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


 function EditProduct(id){

    fetch(`http://localhost:5000/product/get-product/${id}`)
            .then(response => response.json())
             .then(data => {
      setProduct(data[0]);
       // Set the fetched product data
      setId(data[0]._id);
      setProductname(data[0].product_name);
      setDescription(data[0].description);
      setStock(data[0].stock);
      setPrice(data[0].price);
      setCategory(data[0].category);
      setShowModal(true);
    })
            .catch(error => console.error('Error fetching product:', error));

    
    setShowModal(true);
 }

 function closeModel(){
    setProductname("");
    setDescription("");
    setStock("");
    setPrice("");
    setCategory("");
    setShowModal(false);
 }


  return (
   <>
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
                   Edit Product
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
                   <div className="">
                             <img class="peer  top-0  h-44 w-60 object-cover" src={`http://localhost:5000/${product.image}`} alt="product image" />

                   </div>

                   <div className="grid grid-cols-2 gap-9">
                   <label for="productimage" class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                   <input type="file" className="btn bg-primary-600 top-0" name="productimage" id="productimage" onChange={(e)=>SetselectedFile(e.target.files[0])} accept="image/*" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
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
                    onClick={closeModel}
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
    <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Product Name
                            </th>
                           
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Description
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Price
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Chategory
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                STOCKS
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                   <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {products.map(product => (
            <tr key={product._id} id={`product-${product._id}`} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input id={`checkbox-${product._id}`} aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor={`checkbox-${product._id}`} className="sr-only">checkbox</label>
                </div>
              </td>
              <td className="text-base font-semibold text-gray-900 dark:text-white">{product.product_name}</td>
              <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{product.description}</td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">${product.price}</td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.category}</td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.stock}</td>
               <td class="p-4 space-x-2 whitespace-nowrap">
                                <button type="button"  onClick={() => EditProduct(product._id)} id="updateProductButton" data-drawer-target="drawer-update-product-default" data-drawer-show="drawer-update-product-default" aria-controls="drawer-update-product-default" data-drawer-placement="right" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                    View
                                </button>
                                <button type="button" onClick={()=> DeleteProduct(product._id)}  id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete item
                                </button>
                            </td>
            </tr>
          ))}
        </tbody>
        </table>
        </>
  )
}

export default Tablecomponent