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
            url:  '/product/search',
            data: productData
         });
      } catch (err) {
         throw err;
      }
   }

   return { doGetProductByAccount,doGetProductSearch };
}

export default ProductService;