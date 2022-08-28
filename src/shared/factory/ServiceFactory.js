import AuthService from "../../services/AuthService";
import BusinessProfileService from "../../services/BusinessProfileService";
import ProductService from "../../services/ProductService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient),
   businessProfileService : BusinessProfileService(apiClient),
   productService : ProductService(apiClient)
});

export default ServiceFactory;