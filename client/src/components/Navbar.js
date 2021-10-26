import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const [ sidebar, setSidebar ] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)




  return (
    <div className="navbar-container">
      <div className="title">
        <div className="b">T</div>
        <div className="o">H</div>
        <div className="u">E</div>
        <div className="b">H</div>
        <div className="o">O</div>
        <div className="u">L</div>
        <div className="n">L</div>
        <div className="c">Y</div>
        <div className="e">W</div>
        <div className="b">O</div>
        <div className="o">O</div>
        <div className="u">D</div>
        <div className="b">E</div>
        <div className="o">F</div>
        <div className="u">F</div>
        <div className="n">E</div>
        <div className="c">C</div>
        <div className="e">T</div>
        <div className="shadow"></div>
        <div className="shadow-two"></div>
        {/* <h1>HoneyMoon</h1> */}
      </div>
      <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
        <button className="hamburger" type="button" onClick={showSidebar} />
        <ul onClick={showSidebar} className="navbar-nav">
          {/* <div className="icons">
            <Link to="/"><i className="fas fa-video"></i></Link>
          </div> */}
          <li className="nav-item home">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item titles">
            <Link to="/adaptations">Titles</Link>
          </li>
          <li className="nav-item login">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item register">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar