// import React from 'react'

// const Edit = ({itemId,itemName,onEdit}) => {
//    const handleEdit=()=>{

//    }
//    return (
//       <>
//          <div>
//             <button className='bg-blue-600 text-white px-4 py-2 rounded-md '>Edit</button>
//          </div>
//       </>
//    )
// }

// export default Edit;


import React, { useState } from 'react';

const Edit = ({ product, onEdit }) => {
   const [formData, setFormData] = useState({
      title: product.title,
      price: product.price,
      description: product.description,
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Pass the updated data to the parent component
      onEdit(product.id, formData);
   };

   return (
      <div>
         <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
               <label className='block'>Title:</label>
               <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-md w-full"
               />
            </div>
            <div>
               <label className='block'>Price:</label>
               <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-md w-full"
               />
            </div>
            <div>
               <label className='block'>Description:</label>
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-md w-full"
               />
            </div>
            <div className='flex justify-between'>
               <button type="submit" className='bg-green-600 text-white px-4 py-2 rounded-md'>Save</button>
               <button
                  type="button"
                  onClick={() => onEdit(product.id, null)} // To exit edit mode without saving
                  className='bg-gray-600 text-white px-4 py-2 rounded-md'
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
};

export default Edit;
