const AppError = (err) => {
   if (err.response.status !== 400) {
      if (err.response.status === 401) {
         alert('session expired, please re-login');
      } else {
         alert(err.response.data);
      }
   } else {
      alert(err.response.data.responseMessage);
   }
}

export default AppError;