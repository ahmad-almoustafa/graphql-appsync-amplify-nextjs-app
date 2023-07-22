"use client";
import {Post} from '@/src/API';
import { getPost } from '@/src/graphql/queries';
import { fetchPost, getPresignedURL } from '@/utils/helpers';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
  
export default  function Post({ params }: { params: { id: string } }){
    const [post, setPost] = useState<Post>();
    useEffect(() => {
      const getPost = async () => {
          const post= await fetchPost(params.id);
          if(post?.featureImage){
            // get the signed URL string
            post.featureImage=await getPresignedURL(post?.featureImage);
          }
           
          setPost(post);
  
      };
     
  
      getPost();
    }, []);
 

    return post && (
        <div className="max-w-xl mx-auto py-14">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          {post.featureImage && (
            <Image
              className="relative border border-gray-300 rounded-md overflow-hidden"
              src={post.featureImage }
              alt="Image Preview"
              width={500}
              height={500}
            />
          )}
          {/* <Image src={post.featureImage} alt={post.title} width={500} height={300} /> */}
          <p className="text-gray-600 mb-4">
            Author: {post.owner || "Anonymous"} | Last Updated:{" "}
            {new Date(post.updatedAt).toLocaleString()}
          </p>
          <hr className="border-t-2 border-gray-300 mb-4" />
          <div className="prose">
            <div
              className="prose prose-blue"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </div>
      );  
      
      
}   