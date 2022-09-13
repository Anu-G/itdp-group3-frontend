import { async } from "@firebase/util";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../shared/storage/FirebaseConfig";
import {v4 as uuidv4} from 'uuid'

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

   const doGetInput = async({url,data}) => {
      try {
         const response = await client.get(url,data)
         return response;
      } catch (err) {
         throw err;
      }
   }
   
   const doPut = async ({url, data}) => {
      try {
         const response = await client.put(url, data);
         return response;
      } catch (err) {
         throw err;
      }
   }

   const doStoreFile = async({url, data}) => {
      try {
         let fileExt = data.name.split(".").pop()
         let fileName = uuidv4().toString()   
         const storageRef = ref(storage, `toktok-dev${url}/${fileName}.${fileExt}`)
         const uploadTask = uploadBytesResumable(storageRef, data)

         await uploadTask
         let imgUrl = await getDownloadURL(uploadTask.snapshot.ref)

         return imgUrl

      } catch (err) {
         throw err
      }
   }

   const doStoreMultipleFiles = async({url, data}) => {
      try {
         const promises = []
         const links = []

         data.map((image) => {
            let fileExt = image.name.split(".").pop()
            let fileName = uuidv4().toString()   
            const storageRef = ref(storage, `toktok-dev${url}/${fileName}.${fileExt}`)
            const uploadTask = uploadBytesResumable(storageRef, image).then(() => getDownloadURL(storageRef).then((url) => links.push(url)))
            promises.push(uploadTask)
         })

         await Promise.all(promises)
         return links

      } catch (err) {
         throw err
      }
   }

   return { doPost, doGet, doGetInput, doPut, doStoreFile, doStoreMultipleFiles }
}

export default ApiFactory;