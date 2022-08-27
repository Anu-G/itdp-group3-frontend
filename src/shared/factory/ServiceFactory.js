import AuthService from "../../services/AuthService";
import ProfileService from "../../services/ProfileService";
import SettingAccountService from "../../services/SettingAccountService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   profileService: ProfileService(apiClient),
   settingAccountService: SettingAccountService(apiClient)
});

export default ServiceFactory;