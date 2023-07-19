"use client";
import PostList from '@/components/blog/PostList';
import {Post} from '@/src/API';
import { postByUsername } from '@/src/graphql/queries';
import { API, Auth } from 'aws-amplify';
import { Metadata, ResolvingMetadata } from 'next';
import { useEffect, useState } from 'react';
  
export default  function MyBlog({ params }: { params: { id: string } }){
    const [myposts, setMyPosts] = useState<Post[]>([]);
    useEffect(() => {
      const fetchMyPosts = async () => {
        try {
            // authMode => default authorization mode is API key which configured for the app  @/configureAmplify;
            const {username} = await Auth.currentAuthenticatedUser({
                bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
              });
              console.log("username", username);
            const response = (await API.graphql({ 
                query: postByUsername, 
                variables: { username},
                authMode: "AMAZON_COGNITO_USER_POOLS"
            
            } )) as  { data: { postByUsername: { items: Post[] } } };
            console.log("response", response);
            setMyPosts(response.data.postByUsername.items);
          } catch (error) {
            console.log("Error fetching posts:", error);
          }
      };
  
      fetchMyPosts();
    }, []);
 

    return (
        <div className="bg-gray-100 min-h-screen">
          <header className="text-center pt-5  px-6">
            <h1 className="text-2xl py-5 font-bold">My Blog Page!</h1>
          </header>
          <PostList posts={myposts}/>
        </div>
      );
      
      
}   