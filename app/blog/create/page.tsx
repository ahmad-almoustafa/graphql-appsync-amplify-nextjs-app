  "use client";
import { useState } from "react";
import { API, Auth } from "aws-amplify";
import { createPost } from "@/src/graphql/mutations";
import { getCurrentAuthenticatedUser } from "@/utils/helpers";
import { CreatePostInput, Post } from "@/src/API";
import PostForm from "@/components/blog/PostForm";
import { useRouter } from "next/navigation";


  export default function CreatePost() {
    const router = useRouter();

    const handleSubmit = async(post:CreatePostInput) => {

      await savePost(post)
      router.push('/my-blog');
    };
    /**
     * Save the post to the GraphQL API
     * only cognito authenticated user can create post as per to our Auth rules
     * if we didn't put authMode => default mode is API key which can read posts only
     */
    const savePost = async (post:CreatePostInput) => {
     
        try{
          const response = await API.graphql({
            query: createPost,
            variables: { input: post },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          console.log('Post created:', response);
        } catch (error) {
          console.log("Error saving post:", error);
        }
    
    }
    return (
      <>
        <h1 className="text-center py-4 text-3xl font-bold mt-4">Create New Post</h1>
        <PostForm handleSubmit={handleSubmit} />
      </>
    );
  }
