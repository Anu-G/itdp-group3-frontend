import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsTimeline } from '../../shared/components/Navbar/NavItems';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppError';
import './NavTimeline.css';

const NavTimeline = _ => {
  const [buttons, setButtons] = useState([]);
  const authRed = useSelector(AuthSelector);
  const { profileService } = UseDep();
  const navigate = useNavigate();

  useEffect(_ => {
    (async () => {
      try {
        if (authRed.role_id === 1) {
          await profileService.doGetNonBusinessProfile({
            account_id: `${authRed.account_id}`
          });
        } else if (authRed.role_id === 2) {
          await profileService.doGetBusinessProfile({
            account_id: `${authRed.account_id}`
          });
        }
      } catch (err) {
        if (err.response.data.responseCode === 'X01') {
          alert('please complete your profile data first')
          navigate('/profile/settings/profile', { replace: true });
        } else {
          AppError(err);
        }
      }
    })();

    if (authRed.role_id === 2) {
      setButtons([{
        id: 'addPostBtn',
        className: 'sidebar-btn',
        label: 'Add Post',
        onClick: null
      }]);
    }
  }, []);

  return (
    <div>
      <Navbar title={"Timeline"} navItems={navItemsTimeline} buttons={buttons} />
      <div className='inner-content'>
        <Outlet />
      </div>
    </div >
  )
}

export default NavTimeline;
