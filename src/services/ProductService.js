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

   const doPostProductData = async (user) => {
      try {
         return await doPost({
            url: 'product/add/product',
            data: user
         });
      } catch (err) {
         throw err;
      }
   }


   return { doGetProductByAccount, doPostProductData };
}

export default ProductService;

export const ProductImageService = ({ doPostProduct, doGet }) => {
   const doPostProductImage = async (image) => {
      try {
         return await doPostProduct({
            url: '/product/add/product',
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostProductImage };
}