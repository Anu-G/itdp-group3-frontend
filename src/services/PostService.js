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

   const doGetDataById = async (data) => {
      try {
         return await doPost({
            url: '/feed/id',
            data: data
         })
      } catch (err) {
         throw err
      }
   }

   const doEditData = async (editData) => {
      try {
         return await doPost({
            url: '/feed/update',
            data: editData
         })
      } catch (err) {
         throw err;
      }
   }

   const doDeleteData = async (id) => {
      try {
         return await doPost({
            url: '/feed/delete',
            data: id
         })
      } catch (err) {
         throw err;
      }
   }


   return { doPostData, doEditData, doDeleteData, doGetDataById };
}


export const PostImageService = ({ doStoreMultipleFiles, doDeleteFile }) => {

   const doDeleteImage = async(url) => {
      try {
         await doDeleteFile({
            url: url
         })
      } catch (err) {
         throw err
      }
   }

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

   return { doPostImage, doDeleteImage };
}