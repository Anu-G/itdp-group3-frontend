import AuthService from "../../services/AuthService";
import ProfileService from "../../services/ProfileService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   profileService: ProfileService(apiClient)
});

export default ServiceFactory;