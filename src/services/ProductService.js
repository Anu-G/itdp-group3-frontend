import { uuidv4 } from "@firebase/util";

const ProductService = ({ doPost }) => {
   const doGetProductByAccount = async (user) => {
      try {
         return await doPost({
            url: '/product/get/by-account',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }

   const doGetProductSearch = async (productData) => {
      try {
         return await doPost({
            url: '/product/search',
            data: productData
         });
      } catch (err) {
         throw err;
      }
   }

   const doPostProductData = async (user) => {
      try {
         return await doPost({
            url: '/product/add/product',
            data: user
         })
      } catch (err) {
         throw (err);
      }
   }

   const doEditProductData = async (data) => {
      try {
         return await doPost({
            url: '/product/update',
            data: data
         })
      } catch (err) {
         throw (err);
      }
   }

   const doDeleteProductData = async (data) => {
      try {
         return await doPost({
            url: '/product/delete/product',
            data: data
         })
      } catch (err) {
         throw (err);
      }
   }

   return { doGetProductByAccount, doGetProductSearch, doPostProductData, doEditProductData, doDeleteProductData };
}

export default ProductService;

export const ProductImageService = ({ doStoreMultipleFiles, doDeleteFile }) => {

   const doDeleteImage = async(url) => {
      try {
         await doDeleteFile({
            url: url
         })
      } catch (err) {
         throw err
      }
   }

   const doPostProductImage = async (image) => {
      try {
         let folderName = uuidv4().toString()
         return await doStoreMultipleFiles({
            url: `/product/${folderName}`,
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostProductImage, doDeleteImage };
}