import jwtDecode from "jwt-decode";
import { USER_LOGIN, USER_LOGOUT } from "../../../shared/actions/ActionConstants";

const initAuthState = {
   userName: '',
   account_id: 0,
   email: '',
   role_id: 0,
   token: '',
   expiredAt: 0
}

function AuthReducer(state = initAuthState, action) {
   switch (action.type) {
      case USER_LOGIN:
         const decodedToken = jwtDecode(action.data.token);
         return Object.assign({}, state, {
            userName: decodedToken.userName,
            account_id: decodedToken.account_id,
            email: decodedToken.email,
            role_id: decodedToken.role,
            token: action.data.token,
            expiredAt: decodedToken.exp
         });
      case USER_LOGOUT:
         return Object.assign({}, state, {
            userName: '',
            account_id: 0,
            email: '',
            role_id: 0,
            token: ''
         });
      default:
         return state;
   }
}

export default AuthReducer;