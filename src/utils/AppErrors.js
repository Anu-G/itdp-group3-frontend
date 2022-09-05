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

export const AppErrorAuth = (err) => {
   if (err.response.status === 401) {
      return 'session expired, please re-login';
   } else {
      console.error(err);
      return false;
   }
}

export const AppErrorNoProfile = (err) => {
   if (err.response.data.responseCode === 'X01' &&
      err.response.data.responseMessage === 'record not found') {
      return 'please complete your profile data first'
   } else {
      console.error(err);
      return false;
   }
}

export default AppError;