import { Post } from '@/src/API';
import Link from 'next/link';

interface PostListProps {
    posts: Post[];
  };

export default function PostList({posts}:PostListProps)  {
  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-md">
            <Link href={"/blog/"+post.id}>
              <h2 className="text-xl font-bold mb-2 text-blue-500 hover:text-blue-600">{post.title}</h2>
            </Link>
            <p className="text-gray-600">Author: {post.owner || "Anonymous"}</p>
          </div>
        ))}
      </div>
    </main>
  );
};


