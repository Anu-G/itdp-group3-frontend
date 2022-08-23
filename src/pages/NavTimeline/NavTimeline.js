import { Outlet } from 'react-router';
import Navbar from '../../shared/components/Navbar/Navbar';
import './NavTimeline.css';

const NavTimeline = _ => {
  return (
    <div className='timeline'>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div >
  )
}

export default NavTimeline;
