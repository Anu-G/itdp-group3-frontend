import AuthService from "../../services/AuthService";
import BusinessProfileService from "../../services/BusinessProfileService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   businessProfileService : BusinessProfileService(apiClient)
});

export default ServiceFactory;