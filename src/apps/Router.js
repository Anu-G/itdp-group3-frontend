import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router"
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { Login } from "../pages/Login/Login";
import { UserLogoutAction } from "../pages/Login/state/AuthAction";
import NavTimeline from "../pages/NavTimeline/NavTimeline";
import { SignUp } from "../pages/SignUp/SignUp";
import { AuthSelector } from "../shared/selectors/Selectors";

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
         alert(`${err.response}`);
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
         } />
      </Routes>
   )
}

export default AppRouter;