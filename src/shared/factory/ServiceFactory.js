import AuthService from "../../services/AuthService";
import SettingAccountService from "../../services/SettingAccountService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   settingAccountService : SettingAccountService(apiClient)
});

export default ServiceFactory;