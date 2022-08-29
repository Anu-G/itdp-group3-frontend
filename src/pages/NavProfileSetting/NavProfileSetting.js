import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsBusinessProfile, navItemsNonBusinessProfile } from '../../shared/components/Navbar/NavItems';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppError';
import { UserLogoutAction } from '../Login/state/AuthAction';

const NavProfileSetting = _ => {
  const [buttons, setButtons] = useState([]);
  const dispatch = useDispatch();
  const { authService } = UseDep();
  const authRed = useSelector(AuthSelector);

  const onLogout = async _ => {
    try {
      if (authRed.expiredAt * 1000 <= Date.now()) {
        dispatch(UserLogoutAction());
      } else {
        const response = await authService.doLogout();
        if (response.status === 200) {
          dispatch(UserLogoutAction());
        }
      }
    } catch (err) {
      AppError(err);
    }
  }

  useEffect(_ => {
    if (authRed.role_id === 1) {
      setButtons([{
        id: 'applyBusiness',
        className: 'sidebar-btn',
        label: '+ Business Account',
        onClick: null
      }, {
        id: 'logout',
        className: 'sidebar-btn',
        label: 'Logout',
        onClick: onLogout
      }]);
    } else if (authRed.role_id === 2) {
      setButtons([{
        id: 'logout',
        className: 'sidebar-btn',
        label: 'Logout',
        onClick: onLogout
      }]);
    }
  }, []);

  return (
    <div>
      <Navbar title={"Settings"} navItems={authRed.role_id === 2 ? navItemsBusinessProfile : navItemsNonBusinessProfile} buttons={buttons} />
      <div className='inner-content'>
        <Outlet />
      </div>
    </div >
  )
}

export default NavProfileSetting;
