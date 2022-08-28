import AuthService from "../../services/AuthService";
import SettingAccountService from "../../services/SettingAccountService";
import AccountPostService from "../../services/AccountPostService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   settingAccountService : SettingAccountService(apiClient),
   accountPostService : AccountPostService(apiClient)
});

export default ServiceFactory;