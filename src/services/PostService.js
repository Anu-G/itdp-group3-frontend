export const PostImageService = ({ doPost, doGet }) => {
    const doPostImage = async (image) => {
       try {
          return await doPost({
             url: '/feed/create',
             data: image
          });
       } catch (err) {
          throw err;
       }
    }
 
    return { doPostImage };
 }