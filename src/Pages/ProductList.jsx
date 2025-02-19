import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Delete from '../Components/Delete'
import Edit from '../Components/Edit'

const ProductList = ({ searchQuery }) => {
   const [products, setProducts] = useState([]) //products will be be empty at start
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(true)
   const [editingProduct, setEditingProduct] = useState(null);

   const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")


   )
   console.log("Search Query:", searchQuery);

   useEffect(() => {
      const fetchProduct = async () => {
         setLoading(true)
         setError("")
         try {
            const response = await axios.get('https://fakestoreapi.com/products') //Api call of product
            const apiProduct = response.data

            //data from local stoarage
            const localProducts = JSON.parse(localStorage.getItem("products")) || []
            console.log(localProducts);
            // .then((res) => {
            //    setProducts(response.data)
            //    setLoading(false)
            // })
            // setProducts(response.data)
            setProducts([...localProducts, ...apiProduct])

         } catch (err) {
            setError("Failed to fetch prodcuts")
         } finally {
            setLoading(false)
         }
      };
      fetchProduct()
   }, []);
   const handleDelete = (deletedProductId) => {
      // Filter out the deleted product from the current products state
      const updatedProducts = products.filter(product => product.id !== deletedProductId);
      setProducts(updatedProducts);  // Update the state to re-render the UI with the updated list
   };

   const handleEdit = (productId, updatedData) => {
      if (updatedData) {
         // Update the product list and localStorage with the updated product
         const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, ...updatedData } : product
         );
         setProducts(updatedProducts);
         localStorage.setItem("products", JSON.stringify(updatedProducts));
      }

      // Exit edit mode
      setEditingProduct(null);
   };

   if (loading) {
      return <p className='text-center mt-4'>Loading Products...</p>
   }
   if (error) {
      return <p className='text-center mt-4 text-red-500'>{error}</p>
   }

   return (
      <>
         <div>
            <h2 className='text-4xl font-bold m-5 text-center'>Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 xl-grid-cols-4 '>
               {filteredProducts.map((product) => (
                  <div className='border p-5 rounded-xl shadow-md mx-5 my-5' key={product.id}>
                     {editingProduct?.id === product.id ? (
                        <Edit product={product} onEdit={handleEdit} /> // Show the edit form if this product is being edited
                     ) : (
                        <>
                           <h4 className='capitalize text-lg'>{product.category}</h4>
                           <h3 className='font-bold text-md whitespace-nowrap overflow-auto'>{product.title}</h3>
                           <h4 className='text-gray-500'>${product.price}</h4>
                           <img className='h-40 mx-auto' src={product.image} alt="" />
                           <div className='flex justify-between mt-2'>
                              <button
                                 className='bg-blue-600 text-white px-4 py-2 rounded-md'
                                 onClick={() => setEditingProduct(product)} // Enable edit mode
                              >
                                 Edit
                              </button>
                              <Delete productId={product.id} OnDelete={() => handleDelete(product.id)} />
                           </div>
                        </>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </>
   )
}

export default ProductList