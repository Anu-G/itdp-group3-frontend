import AuthService from "../../services/AuthService";
import { CategoryService } from "../../services/CategoryService";
import { ProfileService, ProfileImageService } from "../../services/ProfileService";
import SettingAccountService from "../../services/SettingAccountService";
import AccountPostService from "../../services/AccountPostService";
import ProductService from "../../services/ProductService";

export const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   accountPostService : AccountPostService(apiClient),
   profileService: ProfileService(apiClient),
   settingAccountService: SettingAccountService(apiClient),
   categoryService: CategoryService(apiClient),
   productService: ProductService(apiClient)
});

export const ServiceImageFactory = (apiClient) => ({
   profileImageService: ProfileImageService(apiClient)
});