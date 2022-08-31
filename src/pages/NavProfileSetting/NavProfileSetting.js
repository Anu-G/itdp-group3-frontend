import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsBusinessProfile, navItemsNonBusinessProfile } from '../../shared/components/Navbar/NavItems';
import { PanicPopUpScreen, SuccessPopUpScreen } from '../../shared/components/PopUpScreen/PopUpScreen';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppError';
import { UserLogoutAction } from '../Login/state/AuthAction';

const NavProfileSetting = _ => {
  const [buttons, setButtons] = useState([]);
  const dispatch = useDispatch();
  const { authService, settingAccountService } = UseDep();
  const authRed = useSelector(AuthSelector);

  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const onLogout = async _ => {
    try {
      if (authRed.expiredAt * 1000 <= Date.now()) {
        dispatch(UserLogoutAction());
      } else {
        const response = await authService.doLogout();
        if (response.status === 200) {
          dispatch(UserLogoutAction());
          setSuccess(true);
        }
      }
    } catch (err) {
      AppError(err);
    }
  }

  const onClickSuccess = (value) => {
    setSuccess(current => value);
  }

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  const activateBusiness = async _ => {
    try {
      setLoading(true)
      const response = await settingAccountService.doActivateBusiness({
        account_id: authRed.account_id
      });
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setPanic(prevState => ({
        ...prevState,
        isPanic: true, errMsg: AppError(err)
      }));
    } finally {
      setLoading(false);
    }
  }

  useEffect(_ => {
    if (authRed.role_id === 1) {
      setButtons([{
        id: 'applyBusiness',
        className: 'sidebar-btn',
        label: '+ Business Account',
        onClick: activateBusiness
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
    <>
      <Navbar title={"Settings"} navItems={authRed.role_id === 2 ? navItemsBusinessProfile : navItemsNonBusinessProfile} buttons={buttons} />
      <div className='inner-content'>
        <Outlet />
      </div>

      {isLoading && <LoadingScreen />}
      {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}

export default NavProfileSetting;
