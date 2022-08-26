import { combineReducers } from "redux";
import AuthReducer from "../pages/Login/state/AuthReducer";

const RootReducer = _ => combineReducers({
   AuthReducer,
});

export default RootReducer;