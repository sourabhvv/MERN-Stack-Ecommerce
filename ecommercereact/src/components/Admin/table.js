import React from 'react'

function table({Products}) {
  return (
   <>
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
                                Technology
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Description
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                ID
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Price
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Discount
                            </th>
                            <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {Products.map(product => (
            <tr key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input id={`checkbox-${product._id}`} aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor={`checkbox-${product._id}`} className="sr-only">checkbox</label>
                </div>
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">{product.product_name}</td>
              <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{product.description}</td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">${product.price}</td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.category}</td>
              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.stock}</td>
            </tr>
          ))}
        </tbody>
           </table>
   </>
  )
}

export default table