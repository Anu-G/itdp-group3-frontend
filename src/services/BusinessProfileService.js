const BusinessProfileService = ({ doPost }) => { 
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
 
    return { doGetBusinessProfile };
 }
 
 export default BusinessProfileService;