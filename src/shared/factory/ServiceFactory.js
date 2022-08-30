import AuthService from "../../services/AuthService";
import { CategoryService } from "../../services/CategoryService";
import { ProfileService, ProfileImageService } from "../../services/ProfileService";
import SettingAccountService from "../../services/SettingAccountService";
import ProductService from "../../services/ProductService";
import { PostImageService } from "../../services/PostService";

export const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   profileService: ProfileService(apiClient),
   settingAccountService: SettingAccountService(apiClient),
   categoryService: CategoryService(apiClient),
   productService: ProductService(apiClient)
});

export const ServiceImageFactory = (apiClient) => ({
   profileImageService: ProfileImageService(apiClient),
   postImageService: PostImageService(apiClient)
});