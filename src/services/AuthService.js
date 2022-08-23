const AuthService = ({ doPost, doGet }) => {
   const doLogin = async (userCredential) => {
      try {
         return await doPost({
            url: '/auth/login',
            data: userCredential
         });
      } catch (err) {
         throw err;
      }
   }

   const doRegister = async (newUser) => {
      try {
         return await doPost({
            url: 'auth/register',
            data: newUser
         });
      } catch (err) {
         throw err;
      }
   }

   return { doLogin, doRegister };
}

export default AuthService;