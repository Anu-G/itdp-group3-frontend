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

   return { doGetProductByAccount, doGetProductSearch, doPostProductData };
}

export default ProductService;

export const ProductImageService = ({ doStoreMultipleFiles }) => {
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

   return { doPostProductImage };
}