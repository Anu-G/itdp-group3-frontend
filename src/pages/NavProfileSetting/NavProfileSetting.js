import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsProfile } from '../../shared/components/Navbar/NavItems';
import { UseDep } from '../../shared/context/ContextDep';
import AppError from '../../utils/AppError';
import { UserLogoutAction } from '../Login/state/AuthAction';

const NavProfileSetting = _ => {
  const dispatch = useDispatch();
  const { authService } = UseDep();

  const onLogout = async _ => {
    try {
      const response = await authService.doLogout();
      if (response.status === 200) {
        dispatch(UserLogoutAction());
      }
    } catch (err) {
      AppError(err);
    }
  }

  return (
    <div>
      <Navbar title={"Settings"} navItems={navItemsProfile} btnLabel={"Logout"} btnClick={onLogout} />
      <div className='inner-content'>
        <Outlet />
      </div>
    </div >
  )
}

export default NavProfileSetting;
