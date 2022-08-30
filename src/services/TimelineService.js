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

   const doGetTimelineByCategory = async (user) => {
      try {
         return await doPost({
            url: '/feed/category',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }

   return { doGetTimeline, doGetTimelineByCategory };
 }
 
 export default TimelineService;