import AuthService from "../../services/AuthService";

const ServiceFactory = (apiClient) => ({
   authService: AuthService(apiClient)
});

export default ServiceFactory;