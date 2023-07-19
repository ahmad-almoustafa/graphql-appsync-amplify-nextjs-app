/**
 * `app/blog/page.tsx` is the UI for the `/blog` URL
 * A page is always the leaf of the route subtree.
 **/
"use client";


import { API } from "aws-amplify";
import { useEffect, useState } from "react";

import { listPosts } from "@/src/graphql/queries";
import '@/configureAmplify';
import {Post} from '@/src/API';
import Link from "next/link";
import PostList from "@/components/blog/PostList";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // authMode => default authorization mode is API key which configured for the app  @/configureAmplify;
        const response = (await API.graphql({ query: listPosts } )) as  { data: { listPosts: { items: Post[] } } };
        console.log("response", response);
        setPosts(response.data.listPosts.items);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="text-center pt-5  px-6">
        <h1 className="text-2xl py-5 font-bold">Blog Page!</h1>
      </header>
      <PostList posts={posts}/>

    </div>
  );
}
