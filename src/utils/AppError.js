const AppError = (err) => {
   if (err.response.status !== 400) {
      if (err.response.status === 401) {
         return 'session expired, please re-login';
      } else {
         return (err.response.data);
      }
   } else {
      return (err.response.data.responseMessage);
   }
}

export default AppError;