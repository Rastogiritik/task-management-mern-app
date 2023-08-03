import React from 'react'
import { Link} from 'react-router-dom';


const Navbar = () => {
  
  return (
    <div>
      <Link to='/'><img alt='LOGO' className='logo' src='/images/logo.png' /></Link>

        <ul className='nav-ul'>
          <li><Link to='/' >Tasks</Link></li>
          <li><Link to='/add' >Add Tasks</Link></li>
        </ul>
      
    </div>
  )
}


export default Navbar