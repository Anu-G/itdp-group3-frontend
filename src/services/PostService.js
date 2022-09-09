import { uuidv4 } from "@firebase/util";

export const PostService = ({ doPost }) => {
   const doPostData = async (postData) => {
      try {
         return await doPost({
            url: '/feed/create',
            data: postData
         });
      } catch (err) {
         throw err;
      }
   }


   return { doPostData };
}


export const PostImageService = ({ doStoreMultipleFiles }) => {
   const doPostImage = async (image) => {
      try {
         let folderName = uuidv4().toString()
         return await doStoreMultipleFiles({
            url: `/post/${folderName}`,
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostImage };
}