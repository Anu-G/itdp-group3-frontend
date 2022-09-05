import { USER_LOGIN, USER_LOGOUT } from "../../../shared/constants/ActionConstants";

export const UserLoginAction = (reqData) => ({
   type: USER_LOGIN,
   data: reqData
})

export const UserLogoutAction = _ => ({
   type: USER_LOGOUT
})