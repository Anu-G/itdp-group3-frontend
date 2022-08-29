import AuthService from "../../services/AuthService";
import { CategoryService } from "../../services/CategoryService";
import { ProfileService, ProfileImageService } from "../../services/ProfileService";
import SettingAccountService from "../../services/SettingAccountService";

export const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   profileService: ProfileService(apiClient),
   settingAccountService: SettingAccountService(apiClient),
   categoryService: CategoryService(apiClient)
});

export const ServiceImageFactory = (apiClient) => ({
   profileImageService: ProfileImageService(apiClient)
});