const TimelineService = ({ doGet }) => { 
    const doGetTimeline = async () => {
       try {
          return await doGet({
             url: '/feed/'
          });
       } catch (err) {
          throw err;
       }
    }
 
    return { doGetTimeline };
 }
 
 export default TimelineService;