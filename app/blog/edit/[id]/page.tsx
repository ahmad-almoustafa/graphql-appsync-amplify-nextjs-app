"use client";
import { useEffect, useState } from "react";
import { updatePost } from "@/src/graphql/mutations";
import { fetchPost, getCurrentAuthenticatedUser } from "@/utils/helpers";
import { Post, UpdatePostInput } from "@/src/API";
import PostForm from "@/components/blog/PostForm";
import { useRouter } from "next/navigation";
import { API } from "aws-amplify";

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    const getPost = async () => {
        const post= await fetchPost(params.id);
        setPost(post);

    };
    getPost();
  }, []);

  const handleSubmit = async (post: UpdatePostInput) => {
    await editPost(post);
    router.push("/my-blog");
  };
  /**
   * update post using  GraphQL API
   * only cognito authenticated user can update post as per to our Auth rules
   * if we didn't put authMode => default mode is API key which can read posts only
   */
  const editPost = async (post: UpdatePostInput) => {
    try {
      const { username } = await getCurrentAuthenticatedUser();
      const response = (await API.graphql({
        query: updatePost,
        variables: { input: post }, // Provide the input object with the 'id' property
        
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as { data: { updatePost: Post } };
       //console.log("response", response.data.updatePost);
    } catch (error) {
      console.log("Error editing post:", error);
    }
  };
  return (
    <>
      <h1 className="text-center py-4 text-3xl font-bold mt-4">Edit Post</h1>
      {post && <PostForm post={post} handleSubmit={handleSubmit} />}
    </>
  );
}
