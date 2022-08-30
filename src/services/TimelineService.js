const TimelineService = ({ doPost }) => { 
   const doGetTimeline = async (user) => {
      try {
         return await doPost({
            url: '/feed/timeline',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }

   return { doGetTimeline };
 }
 
 export default TimelineService;