import { Post } from "@/src/API";
import { getPost } from "@/src/graphql/queries";
import { API, Auth, Storage} from "aws-amplify";

export const getCurrentAuthenticatedUser= async ()=>{
    const user= await Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  });
  return user
}

export const fetchPost = async (id:string) => {
  try {
    // authMode => default authorization mode is API key which configured for the app  @/configureAmplify;
    const response = (await API.graphql({ 
      query: getPost ,
      variables: { id},
  } )) as  { data: { getPost: Post } };
    console.log("response", response);
   return response.data.getPost;
  } catch (error) {
    console.log("Error fetching post:", error);
  }
};

/**
 * 
 * @see https://docs.amplify.aws/lib/storage/upload/q/platform/js/#protected-level
 */
export const uploadFile = async (file: any) => {
  try {
    const result= await Storage.put(file.name, file, {
      contentType: file.type,
    });
    console.log('File uploaded successfully', result);
    // Return the URL of the uploaded file
    return result.key;
  } catch (error) {
    console.log("Error uploading file:", error);
  }
}
/**
 * 
 * @see https://docs.amplify.aws/lib/storage/download/q/platform/js/
 */
export const getPresignedURL= async (key:string)=>{
      // get the signed URL string
      const url= await Storage.get(key); 
      return url;
}