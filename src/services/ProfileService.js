const ProfileService = ({ doPost, doGet }) => {
   const doGetNonBusinessProfile = async (account) => {
      try {
         return await doPost({
            url: '/non-business-profile/get/profile',
            data: account
         });
      } catch (err) {
         throw err;
      }
   }

   return { doGetNonBusinessProfile };
}

export default ProfileService;