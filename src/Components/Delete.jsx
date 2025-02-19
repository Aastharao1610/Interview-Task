import axios from 'axios'

import React from 'react'

const Delete = ({ productId, OnDelete }) => {
   const handleDelete = () => {
      try {

         const storedItem = JSON.parse(localStorage.getItem("products")) || [];
         const updatedProducts = storedItem.filter((p) => p.id !== productId)
         localStorage.setItem("products", JSON.stringify(updatedProducts))
         OnDelete(productId)
      }
      catch (err) {
         console.error("Error while delete product", err)
      }


   }



   return (
      <>
         <div>
            <button onClick={handleDelete} className='bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md '>Delete</button>
         </div>
      </>
   )
}

export default Delete;

