import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router"
import { CategorizePage } from "../pages/CategorizePage/CategorizePage";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { Login } from "../pages/Login/Login";
import { UserLogoutAction } from "../pages/Login/state/AuthAction";
import NavProfileSetting from "../pages/NavProfileSetting/NavProfileSetting";
import NavTimeline from "../pages/NavTimeline/NavTimeline";
import { Profile } from "../pages/Profile/Profile";
import { SettingsAccount } from "../pages/SettingsAccount/SettingsAccount";
import { SettingsCatalog } from "../pages/SettingsCatalog/SettingsCatalog";
import { SettingsFaq } from "../pages/SettingsFaq/SettingsFaq";
import { SettingsPost } from "../pages/SettingsPost/SettingsPost";
import { SettingsNonBusinessProfile } from "../pages/SettingsProfile/SettingNonBusinessProfile";
import { SettingsBusinessProfile } from "../pages/SettingsProfile/SettingsBusinessProfile";
import { SettingsAddProduct } from "../pages/SetttingsAddProduct/SettingsAddProduct";
import { SignUp } from "../pages/SignUp/SignUp";
import { TimelineCard } from "../pages/TimelineCard/TimelineCard";
import { TimelinePage } from "../pages/TimelinePage/TimelinePage";
import { AuthSelector } from "../shared/selectors/Selectors";
import AppError from "../utils/AppError";

const AppRouter = _ => {
   const authRed = useSelector(AuthSelector);
   const dispatch = useDispatch();

   const RequireAuth = ({ children }) => {
      const authed = authRed.token !== '';
      if (authed) {
         if (authRed.expiredAt * 1000 <= Date.now()) {
            alert('session expired, please re-login');
            forceLogout();
         } else {
            return children
         }
      } else {
         return <Navigate to={"/auth/login"} replace />
      }
   }

   const forceLogout = _ => {
      try {
         dispatch(UserLogoutAction());
         return <Navigate to={"/auth/login"} replace />
      } catch (err) {
         AppError(err);
      }
   }

   return (
      <Routes>
         <Route exact path="/" element={<Navigate to={"/feeds"} />} />
         <Route path="/auth/login" element={<Login />} />
         <Route path="/auth/register" element={<SignUp />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/feeds" element={
            <RequireAuth>
               <NavTimeline />
            </RequireAuth>
         } >
            <Route index element={<TimelinePage />} />
            <Route path="category" element={<CategorizePage />} />
            <Route path="search" element={<></>} />
         </Route>
         <Route path="/profile" element={
            <RequireAuth>
               <NavProfileSetting />
            </RequireAuth>
         } >
            <Route index element={<Profile />} />
            {authRed.role_id === 1 ?
               <Route path="settings/profile" element={<SettingsNonBusinessProfile />} /> :
               <Route path="settings/profile" element={<SettingsBusinessProfile />} />
            }
            <Route path="settings/account" element={<SettingsAccount />} />
            <Route path="settings/catalog" element={<SettingsCatalog />} />
            <Route path="settings/post" element={<SettingsPost />} />
            <Route path="settings/faq" element={<SettingsFaq />} />
         </Route>
         <Route path="/test" element={<TimelinePage />} />
      </Routes>
   )
}

export default AppRouter;