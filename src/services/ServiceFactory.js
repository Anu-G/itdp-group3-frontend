import AuthService from "./AuthService";
import { CategoryService } from "./CategoryService";
import { ProfileService, ProfileImageService } from "./ProfileService";
import SettingAccountService from "./SettingAccountService";
import ProductService, { ProductImageService } from "./ProductService";
import AccountPostService from "./AccountPostService";
import TimelineService from "./TimelineService";
import { PostImageService, PostService } from "./PostService";

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