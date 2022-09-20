import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Navbar, { HeaderBar } from '../../shared/components/Navbar/Navbar';
import { buttonNavBusiness, buttonNavNonBusiness, navItemsBusinessProfile, navItemsNonBusinessProfile } from '../../shared/components/Navbar/NavItems';
import { PanicPopUpScreen, SuccessPopUpScreen, SuccessPopUpScreenCustom } from '../../shared/components/PopUpScreen/PopUpScreen';
import { UseDep } from '../../shared/context/ContextDep';
import { AuthSelector } from '../../shared/selectors/Selectors';
import AppError from '../../utils/AppErrors';
import { UserLogoutAction } from '../Login/state/AuthAction';

const NavProfileSetting = _ => {
  // service
  const dispatch = useDispatch();
  const { authService, settingAccountService } = UseDep();
  const authRed = useSelector(AuthSelector);

  const onLogout = async _ => {
    try {
      if (authRed.expiredAt * 1000 <= Date.now()) {
        dispatch(UserLogoutAction());
      } else {
        setButtons(authRed.role_id === 2 ? buttonNavBusiness(onLogout, true) : buttonNavNonBusiness(activateBusiness, onLogout, false, true));
        setLoading(true);
        const response = await authService.doLogout();
        if (response.status === 200) {
          dispatch(UserLogoutAction());
          setSuccess(true);
        }
      }
    } catch (err) {
      AppError(err);
    } finally {
      setLoading(false);
    }
  }

  const activateBusiness = async _ => {
    try {
      setButtons(buttonNavNonBusiness(activateBusiness, onLogout, true, false));
      setLoading(true);
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
      setButtons(buttonNavNonBusiness(activateBusiness, onLogout, false, false));
      setLoading(false);
    }
  }

  // state
  const [buttons, setButtons] = useState(authRed.role_id === 2 ? buttonNavBusiness(onLogout, false) : buttonNavNonBusiness(activateBusiness, onLogout, false, false));

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
      <HeaderBar />
      <div className={`content-spc ${isLoading && 'loading-div'}`}>
        <Navbar title={"Settings"} navItems={authRed.role_id === 2 ? navItemsBusinessProfile : navItemsNonBusinessProfile} buttons={buttons} />
        <div className='inner-content'>
          <Outlet />
        </div>

      </div>


      {success && <SuccessPopUpScreen onClickAnywhere={onClickSuccess} />}
      {successActivate && <SuccessPopUpScreenCustom onClickAnywhere={onClickSuccessActivate} successMsg={'please logout to change your account'} />}
      {panic.isPanic && <PanicPopUpScreen onClickAnywhere={onClickPanic} errMsg={panic.errMsg} />}
    </>
  )
}

export default NavProfileSetting;
