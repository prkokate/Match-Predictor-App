import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='main-nav-div' >
      <div className="nav-logo"><h3>Premier Predictor</h3></div>
      <div className="nav-links">
        <ul className="nav-links-ul">
          <Link to="/"> <li className="nav-links-list">Home</li></Link>
          <Link to="/matches"> <li className="nav-links-list">Matches</li></Link>
          <Link to="/previous-predictions"> <li className="nav-links-list">Previous Predictions</li></Link>
          <Link to="accuracy"> <li className="nav-links-list">Accuracy</li></Link>
          <Link to=""> <li className="nav-links-list">Logout</li></Link>
        </ul>
      </div>
    </nav>
  )
}
