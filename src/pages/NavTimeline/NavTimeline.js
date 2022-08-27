import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsTimeline } from '../../shared/components/Navbar/NavItems';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppError';
import './NavTimeline.css';

const NavTimeline = _ => {
  const authRed = useSelector(AuthSelector);
  const dispatch = useDispatch();
  const { profileService } = UseDep();
  const navigate = useNavigate();

  useEffect(_ => {
    (async () => {
      try {
        const response = await profileService.doGetNonBusinessProfile({
          account_id: `${authRed.account_id}`
        });
        console.log(response);
      } catch (err) {
        if (err.response.data.responseCode === 'X04') {
          alert('please complete your account data first')
          navigate('/profile/settings/account', { replace: true });
        } else {
          AppError(err);
        }
      }
    })();
  }, []);

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
