import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './apps/Store';
import { PersistGate } from 'redux-persist/integration/react'
import { DepProvider } from './shared/context/ContextDep';
import ApiFactory from './shared/factory/ApiFactory';
import { AxiosClient, AxiosImageClient } from './apps/Client';
import { ServiceFactory, ServiceImageFactory } from './shared/factory/ServiceFactory';
import { InjectStore } from './shared/interceptor/AuthInterceptor';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const { store, persistor } = Store();
const apiClient = ApiFactory(AxiosClient);
const apiImageClient = ApiFactory(AxiosImageClient);
const service = ServiceFactory(apiClient);
const serviceImage = ServiceImageFactory(apiImageClient);
InjectStore(store);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DepProvider service={service} serviceImage={serviceImage}>
          <App />
        </DepProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
