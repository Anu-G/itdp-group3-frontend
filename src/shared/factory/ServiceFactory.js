import AuthService from "../../services/AuthService";
import { CategoryService } from "../../services/CategoryService";
import { ProfileService, ProfileImageService } from "../../services/ProfileService";
import SettingAccountService from "../../services/SettingAccountService";
import ProductService from "../../services/ProductService";
import AccountPostService from "../../services/AccountPostService";
import TimelineService from "../../services/TimelineService";

export const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   profileService: ProfileService(apiClient),
   settingAccountService: SettingAccountService(apiClient),
   categoryService: CategoryService(apiClient),
   productService: ProductService(apiClient),
   accountPostService: AccountPostService(apiClient),
   timelineService: TimelineService(apiClient)
});

export const ServiceImageFactory = (apiClient) => ({
   profileImageService: ProfileImageService(apiClient)
});