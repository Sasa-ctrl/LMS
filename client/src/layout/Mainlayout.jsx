import Navbar from '@/components/Navbar'
import Login from '@/pages/login'
import Herosection from '@/pages/student/Herosection'
import React, { Children } from 'react'
import { Outlet } from 'react-router-dom';





const Mainlayout = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Mainlayout
