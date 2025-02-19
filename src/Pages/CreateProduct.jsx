import axios from 'axios'

import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//store new product locally in local storage
const CreateProduct = () => {

   const [formData, setFormData] = useState({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
   })
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [sucess, setSucess] = useState(false)

   const Navigate = useNavigate()

   const handleChange = (e) => {
      // const { name, value } = e.target;
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,

      });

   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      setError(null)
      setSucess(false)


      try {
         const response = await axios.post('https://fakestoreapi.com/products', formData)
         console.log(response.data)
         const newProduct = { ...formData, id: response.data.id }
         const storedItem = JSON.parse(localStorage.getItem("products")) || [];
         // storedItem.push(newProduct)
         // localStorage.setItem("Products", JSON.stringify(storedItem))
         const validStoredItem = Array.isArray(storedItem) ? storedItem : [];
         validStoredItem.push(newProduct);
         localStorage.setItem("products", JSON.stringify(validStoredItem));
         alert("Product created succefully")
         setSucess(true)
         setFormData({ title: "", price: "", description: "", category: "", image: "" })
         Navigate('/')

      } catch (err) {

         setError("failed to create  product,Will you please try again after sometime?")
         console.log("Error Adding product", err);

      } finally {
         setLoading(false)
      }
   }
   return (
      <>
         <div className='mx-auto max-w-lvh bg-white shadow-lg mt-10 rounded-lg '>
            <h2 className='text-2xl font-bold m-5 text-center'>Create New product</h2>
            {error && <p className='text-red-400 text-center'>{error}</p>}
            {loading && <p>Sumbitting...</p>}
            <form onSubmit={handleSubmit} className=' rounded-sm  mx-6' action="">
               {/* For title */}
               {/* <h3 className='m-4'>Fill the below form to create new product</h3> */}
               <input
                  type="text"
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  className='w-full  mt-3 p-2 mb-4 border rounded'
               />
               {/* For price */}
               <input type="number"
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                  className='w-full  p-2 mb-4 border rounded'
               />

               <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="description"
                  className='w-full  p-2 border  mb-4 rounded'
                  required
               />
               <input type="text"
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                  className='w-full  p-2 border mb-4 rounded'
               />
               <input type="url"
                  name='image'
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image Url"
                  required
                  className='w-full  p-2 border rounded'
               />

               <button
                  type='submit'
                  className='bg-blue-500 text-white my-4 px-4 py-2 rounded-sm mx-2'
                  disabled={loading}
               >{loading ? "Creating..." : "Create Product"}
               </button>
            </form>
         </div>
      </>
   )
}

export default CreateProduct