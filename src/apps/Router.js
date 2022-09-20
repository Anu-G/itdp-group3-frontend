import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router"
import { AddPost } from "../pages/AddPost/AddPost";
import { CatalogPage } from "../pages/CategorizePage/CatalogPage/CatalogPage";
import { CategorizePage } from "../pages/CategorizePage/CategorizePageProfile";
import { CategorizePageTimeline } from "../pages/CategorizePage/CategorizePageTimeline";
import { FAQPages } from "../pages/CategorizePage/FAQPages/FAQPages";
import { DetailPostCard } from "../pages/DetailPostCard/DetailPostCard";
import { DetailProductCard } from "../pages/DetailProductCard/DetailProductCard";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { Login } from "../pages/Login/Login";
import { UserLogoutAction } from "../pages/Login/state/AuthAction";
import NavProfileSetting from "../pages/NavProfileSetting/NavProfileSetting";
import NavTimeline from "../pages/NavTimeline/NavTimeline";
import { OurLinks } from "../pages/OurLinks/OurLinks";
import { BusinessProfile } from "../pages/Profile/BusinessProfile";
import { NonBusinessProfile } from "../pages/Profile/NonBusinessProfile";
import { Search } from "../pages/Search/Search";
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
import { LoadingScreen } from "../shared/components/LoadingScreen/LoadingScreen";
import { PanicPopUpScreen, SuccessPopUpScreen } from "../shared/components/PopUpScreen/PopUpScreen";
import { AuthSelector } from "../shared/selectors/Selectors";
import AppError from "../utils/AppErrors";

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
            <Route path="category" element={<CategorizePageTimeline />} />
            <Route path="search" element={<Search />} />
         </Route>
         <Route path="/account" element={
            <RequireAuth>
               <NavTimeline />
            </RequireAuth>
         } >
            <Route path=":accId" element={<BusinessProfile/>}/>
         </Route>
         <Route path="/p" element={
            <RequireAuth>
               <NavTimeline />
            </RequireAuth>
         } >
            <Route path=":postId" element={<DetailPostCard/>}/>
         </Route>
         <Route path="/profile" element={
            <RequireAuth>
               <NavProfileSetting />
            </RequireAuth>
         } >
            {authRed.role_id === 1 ?
               <Route index element={<NonBusinessProfile />} /> :
               <Route index element={<BusinessProfile />} />
            }
            {authRed.role_id === 1 ?
               <Route path="settings/profile" element={<SettingsNonBusinessProfile />} /> :
               <Route path="settings/profile" element={<SettingsBusinessProfile />} />
            }
            <Route path="settings/account" element={<SettingsAccount />} />
            <Route path="settings/catalog" element={<SettingsAddProduct />} />
            <Route path="settings/faq" element={<SettingsFaq />} />
         </Route>
         <Route path="/test" element={<SuccessPopUpScreen />} />
      </Routes>
   )
}

export default AppRouter;