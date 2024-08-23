import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Componets/Layout/Layout'
import Login from './Componets/Login/Login'
import Register from './Componets/Register/Register'
import Prodoucts from './Componets/Prodoucts/Prodoucts'
import Cart from './Componets/Cart/Cart'
import Brand from './Componets/Brand/Brand'
import Notfound from './Componets/Notfound/Notfound'
import Home from './Componets/Home/Home'
import Protectedroute from './Componets/protectedroute/Protectedroute'
import Forget from './Componets/forgetpassword/Forget'
import Resetcode from './Componets/forgetpassword/Resetcode'
import NewPassword from './Componets/forgetpassword/Newpassword'
import ProdouctDetalise from './Componets/Prodoucts/ProdouctDetalise'
import Categoreitem from './Componets/categoreitems/Categoreitem'
import Wishlist from './Componets/wishlist/Wishlist'

function App() {

  let rout = createBrowserRouter([{
    path: '/', element: <Layout></Layout>, children: [
      { index:true, element:<Protectedroute><Home></Home></Protectedroute> },
      { path:'/login', element:<Login></Login>},
      { path:'/register', element:<Register></Register>},
      { path:'/forget', element:<Forget></Forget>},
      { path:'/reset', element:<Resetcode></Resetcode>},
      { path:'/newpassword', element:<NewPassword></NewPassword>},
      { path:'/Prodoucts', element:<Protectedroute><Prodoucts></Prodoucts></Protectedroute>},
      { path:'/prodouctDetalise/:id/:categoryid', element:<Protectedroute><ProdouctDetalise></ProdouctDetalise></Protectedroute>},
      { path:'/categories', element:<Protectedroute><Categoreitem></Categoreitem></Protectedroute>},
      { path:'/wishlist', element:<Protectedroute><Wishlist></Wishlist></Protectedroute>},
      { path:'/cart', element:<Protectedroute><Cart></Cart></Protectedroute>},
      { path:'/brand', element:<Protectedroute><Brand></Brand></Protectedroute>},
      { path:'*', element:<Protectedroute><Notfound></Notfound></Protectedroute>},
    ]
  }])

  return (
    <RouterProvider router={rout}/>
  )
}

export default App
