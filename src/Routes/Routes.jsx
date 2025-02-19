import React from 'react'
import ProductList from '../Pages/ProductList'
import CreateProduct from '../Pages/CreateProduct'
import EditProduct from '../Pages/EditProduct'
import { Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
   return (
      <>

         <Routes>
            <Route
               path='/'
               element={<ProductList />}
            />


            <Route
               path='/create'
               element={<CreateProduct />} />

            <Route
               path='/edit/:id'
               element={<EditProduct />} />

         </Routes>

      </>
   )
}

export default AppRoutes