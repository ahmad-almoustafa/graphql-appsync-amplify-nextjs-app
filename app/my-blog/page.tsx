"use client";
import PostList from '@/components/blog/PostList';
import {Post} from '@/src/API';
import { deletePost, updatePost } from '@/src/graphql/mutations';
import { postByUsername } from '@/src/graphql/queries';
import { getCurrentAuthenticatedUser } from '@/utils/helpers';
import { API } from 'aws-amplify';
import Link from 'next/link';
import { useEffect, useState } from 'react';

  
export default  function MyBlog({ params }: { params: { id: string } }){
    const [myposts, setMyPosts] = useState<Post[]>([]);
    const fetchMyPosts = async () => {
        try {
            // authMode => default authorization mode is API key which configured for the app  @/configureAmplify;
            const {username}=  await getCurrentAuthenticatedUser()
            const response = (await API.graphql({ 
                query: postByUsername, 
                variables: { username},
                authMode: "AMAZON_COGNITO_USER_POOLS"
            
            } )) as  { data: { postByUsername: { items: Post[] } } };
            console.log("response", response);
            setMyPosts(response.data.postByUsername.items);
        } catch (error) {
            console.log("Error fetching user posts:", error);
        }
    };

    useEffect(() => {
      fetchMyPosts();
    }, []);

    const deleteUserPost = async (id:string) => {
        try {
            const {username}=  await getCurrentAuthenticatedUser()
            const response = (await API.graphql({ 
                query: deletePost, 
                variables: {
                    input: { id }, // Provide the input object with the 'id' property
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            
            } )) as  { data: { deletePost:  Post } };
            // console.log("response", response.data.deletePost);
            // refetch the posts => update myposts state => trigger rerendering
            fetchMyPosts();
           
        } catch (error) {
            console.log("Error deleting post:", error);
        }
    }


    // JSX component name must start with a capital letter. 
    const Actions:React.FC<Post> =(post:Post)=>{
        return(
            <div className="flex justify-end mt-4 space-x-2">
            <Link 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                href={`/blog/edit/${post.id}`}
            >
              Edit
            </Link>
            <button 
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={() => deleteUserPost(post.id)}
          
            >
              Delete
              
            </button>
          </div>
        )
    }
    return (
        <div className="bg-gray-100 min-h-screen">
          <header className="text-center pt-5  px-6">
            <h1 className="text-2xl py-5 font-bold">My Blog Page!</h1>
          </header>
          <PostList posts={myposts} Actions={Actions}/>
        </div>
      );
      
      
}   