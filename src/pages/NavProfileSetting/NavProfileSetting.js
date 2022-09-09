import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';
import { LoadingScreen } from '../../shared/components/LoadingScreen/LoadingScreen';
import Navbar from '../../shared/components/Navbar/Navbar';
import { navItemsBusinessProfile, navItemsNonBusinessProfile, navItemsTimeline } from '../../shared/components/Navbar/NavItems';
import { PanicPopUpScreen, SuccessPopUpScreen, SuccessPopUpScreenCustom } from '../../shared/components/PopUpScreen/PopUpScreen';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppErrors';
import { UserLogoutAction } from '../Login/state/AuthAction';

const NavProfileSetting = _ => {
  // state
  const [buttons, setButtons] = useState([]);

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

  // service
  const dispatch = useDispatch();
  const { authService, settingAccountService } = UseDep();
  const authRed = useSelector(AuthSelector);

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

  const activateBusiness = async _ => {
    try {
      setLoading(true)
      const response = await settingAccountService.doActivateBusiness({
        account_id: authRed.account_id
      });
      if (response.status === 200) {
        setSuccessActivate(true);
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

  // screen
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successActivate, setSuccessActivate] = useState(false);
  const [panic, setPanic] = useState({ isPanic: false, errMsg: '' });

  const onClickSuccess = (value) => {
    setSuccess(current => value);
  }

  const onClickSuccessActivate = (value) => {
    setSuccessActivate(current => value);
  }

  const onClickPanic = (value) => {
    setPanic(prevState => ({
      ...prevState,
      isPanic: value, errMsg: ''
    }));
  }

  return (
    <>
      <Navbar title={"Settings"} navItems={authRed.role_id === 2 ? navItemsBusinessProfile : navItemsNonBusinessProfile} buttons={buttons} />
      <div className='inner-content'>
        <Outlet />
      </div>

      {isLoading && <LoadingScreen />}
      {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
      {successActivate && <SuccessPopUpScreenCustom onClickAnywhere={onClickSuccessActivate} successMsg={'please logout to change your account'} />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}

export default NavProfileSetting;
