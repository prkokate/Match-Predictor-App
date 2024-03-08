import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const [menu,setmenu]=useState(false);

  return (
    <nav className='main-nav-div' >
      <div onMouseEnter={()=>{setmenu(true)}} onMouseLeave={()=>setmenu(false)} className="nav-logo">
        <h3>Premier Predictor</h3>
      </div>

      
      <div onMouseEnter={()=>{setmenu(true)}} onMouseLeave={()=>setmenu(false)} style={menu?{width:"25rem"}:{}} className="nav-links">
        <ul className="nav-links-ul">
          <Link to="/"> <li style={menu?{width:"100%"}:{}} className="nav-links-list">Home</li></Link>
          <Link to="/about-us"> <li style={menu?{width:"100%"}:{}} className="nav-links-list">About us</li></Link>
          <Link to="/feedback"> <li style={menu?{width:"100%"}:{}} className="nav-links-list">Send Feedback</li></Link>
        </ul>
      </div>
    </nav>
  )
}
