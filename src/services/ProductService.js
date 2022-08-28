const ProductService = ({ doPost }) => { 
    const doGetProductByAccount = async (user) => {
       try {
          return await doPost({
             url: 'product/get/by-account',
             data: user
          });
       } catch (err) {
          throw err;
       }
    }
 
    return { doGetProductByAccount };
 }
 
 export default ProductService;