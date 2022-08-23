const ApiFactory = (client) => {
   const doPost = async ({ url, data }) => {
      try {
         const response = await client.post(url, data);
         return response;
      } catch (err) {
         throw err;
      }
   }

   const doGet = async ({ url }) => {
      try {
         const response = await client.get(url);
         return response;
      } catch (err) {
         throw err;
      }
   }

   return { doPost, doGet }
}

export default ApiFactory;