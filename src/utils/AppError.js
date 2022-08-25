const AppError = (err) => {
   if (err.response.status !== 400) {
      alert(err.response.data);
   } else {
      alert(err.response.data.responseMessage);
   }
}

export default AppError;