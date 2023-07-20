"use client";
import {Post} from '@/src/API';
import { getPost } from '@/src/graphql/queries';
import { fetchPost } from '@/utils/helpers';
import { API } from 'aws-amplify';
import { Metadata, ResolvingMetadata } from 'next';
import { Props } from 'next/script';
import { useEffect, useState } from 'react';
  
export default  function Post({ params }: { params: { id: string } }){
    const [post, setPost] = useState<Post>();
    useEffect(() => {
      const getPost = async () => {
          const post= await fetchPost(params.id);
          setPost(post);
  
      };
  
      getPost();
    }, []);
 

    return post && (
        <div className="max-w-xl mx-auto py-14">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
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