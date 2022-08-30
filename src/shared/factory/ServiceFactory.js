import AuthService from "../../services/AuthService";
import { CategoryService } from "../../services/CategoryService";
import { ProfileService, ProfileImageService } from "../../services/ProfileService";
import SettingAccountService from "../../services/SettingAccountService";
import ProductService, { ProductImageService } from "../../services/ProductService";
import AccountPostService from "../../services/AccountPostService";
import TimelineService from "../../services/TimelineService";
import { PostImageService, PostService } from "../../services/PostService";

export const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   profileService: ProfileService(apiClient),
   settingAccountService: SettingAccountService(apiClient),
   categoryService: CategoryService(apiClient),
   productService: ProductService(apiClient),
   accountPostService: AccountPostService(apiClient),
   timelineService: TimelineService(apiClient),
   postService: PostService(apiClient)
});

export const ServiceImageFactory = (apiClient) => ({
   profileImageService: ProfileImageService(apiClient),
   postImageService: PostImageService(apiClient),
   productImageService: ProductImageService(apiClient)
});