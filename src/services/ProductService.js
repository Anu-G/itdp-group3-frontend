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

export const ProductImageService = ({ doPost, doGet }) => {
   const doPostProductImage = async (image) => {
      try {
         return await doPost({
            url: '/product/add/product-image',
            data: image
         });
      } catch (err) {
         throw err;
      }
   }

   return { doPostProductImage };
}