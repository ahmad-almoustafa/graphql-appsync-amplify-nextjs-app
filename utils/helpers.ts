import { Auth } from "aws-amplify";

export const getCurrentAuthenticatedUser= async ()=>{
    const user= await Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  });
  return user
}