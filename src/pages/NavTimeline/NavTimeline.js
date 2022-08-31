import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsTimeline } from '../../shared/components/Navbar/NavItems';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError, { AppErrorAuth } from '../../utils/AppError';
import { AddPost } from '../AddPost/AddPost';
import './NavTimeline.css';

const NavTimeline = _ => {
  const [buttons, setButtons] = useState([]);
  const authRed = useSelector(AuthSelector);
  const { profileService } = UseDep();
  const navigate = useNavigate();
  const [openAddPost, setOpenAddPost] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const togglePopup = () => {
    setOpenAddPost(!openAddPost);
  }

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
        if (AppErrorAuth(err)) {
          setPanic(prevState => ({
            ...prevState,
            isPanic: true, errMsg: AppErrorAuth(err)
          }));
        }
      } finally {
        setLoading(false);
      }
    })();

    if (authRed.role_id === 2) {
      setButtons([{
        id: 'addPostBtn',
        className: 'sidebar-btn',
        label: 'Add Post',
        onClick: togglePopup
      }]);
    }
  }, []);

  const onClickSuccess = (value) => {
    setSuccess(current => value);
  }

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  return (
    <>
      <Navbar title={"Timeline"} navItems={navItemsTimeline} buttons={buttons} />
      <div className='inner-content'>
        <Outlet />
      </div>
      <AddPost isOpen={openAddPost} togglePopup={togglePopup} />

      {isLoading && <LoadingScreen />}
      {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}

export default NavTimeline;
