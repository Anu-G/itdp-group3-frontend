export const ProfileService = ({ doPost, doGet }) => {
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

   const addNonBusinessProfile = async (account) => {
      try {
         return await doPost({
            url: '/non-business-profile/add/profile',
            data: account
         });
      } catch (err) {
         throw err;
      }
   }

   const doGetBusinessProfile = async (user) => {
      try {
         return await doPost({
            url: '/business-profile/get/profile',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }

   const addBusinessProfile = async (account) => {
      try {
         return await doPost({
            url: '/business-profile/add/profile',
            data: account
         });
      } catch (err) {
         throw err;
      }
   }

   return { doGetNonBusinessProfile, doGetBusinessProfile, addNonBusinessProfile, addBusinessProfile };
}

export const ProfileImageService = ({ doPost, doGet }) => {
   const addNonBusinessProfileImage = async (image) => {
      try {
         return await doPost({
            url: '/non-business-profile/add/profile-image',
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { addNonBusinessProfileImage };
}