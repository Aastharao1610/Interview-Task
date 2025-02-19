import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({ searchQuery, setSearchQuery }) => {

   return (
      <>
         <nav className='bg-blue-500 p-4 shadow-md'>
            <div className='flex justify-between mx-auto items-center'>
               <h1 className='text-xl text-gray-200 font-bold'>Product DashBorad</h1>
               <input type="text" placeholder='Search Product...' value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className='placeholder:text-white border ' />
               <div className='space-x-7 text-white'>
                  <Link className='hover:underline' to="/">Products</Link>
                  <Link className='hover:underline' to="/create" >Add Product</Link>
               </div>
            </div>
         </nav>
      </>
   )
}

export default Navbar