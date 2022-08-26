let store;

export const InjectStore = (_store) => {
   store = _store
}

export const AuthInterceptor = (config) => {
   if (config.url !== '/auth/login' || config.url !== '/auth/register') {
      config.headers.Authorization = `Bearer ${store.getState().AuthReducer.token}`;
   }

   return config;
}
