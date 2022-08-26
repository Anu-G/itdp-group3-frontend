import { Outlet } from 'react-router';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsTimeline } from '../../shared/components/Navbar/NavItems';
import './NavTimeline.css';

const NavTimeline = _ => {
  return (
    <div>
      <Navbar title={"Timeline"} navItems={navItemsTimeline} btnLabel={"Add Post"} />
      <div className='inner-content'>
        <Outlet />
      </div>
    </div >
  )
}

export default NavTimeline;
