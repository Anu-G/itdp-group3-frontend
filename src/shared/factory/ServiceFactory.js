import AuthService from "../../services/AuthService";
import BusinessProfileService from "../../services/BusinessProfileService";
import ProductService from "../../services/ProductService";
import TimelineService from "../../services/TimelineService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   businessProfileService : BusinessProfileService(apiClient),
   productService : ProductService(apiClient),
   timelineService : TimelineService(apiClient)
});

export default ServiceFactory;