import { Post } from '@/src/API';
import Link from 'next/link';
import Image from 'next/image';
import { getPresignedURL } from '@/utils/helpers';

interface PostListProps {
    posts: Post[];
    Actions?:React.FC<Post> ;
  };

export default function PostList({posts,Actions}:PostListProps)  {
  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-md">
            <Link href={"/blog/"+post.id}>
              <h2 className="text-xl font-bold mb-2 text-blue-500 hover:text-blue-600">{post.title}</h2>
            </Link>
            {post.featureImage && (
            <Image
              className="relative border border-gray-300 rounded-md overflow-hidden"
              src={post?.featureImage}
              alt="Image Preview"
              width={500}
              height={500}
            />
          )}
            <p className="text-gray-600">Author: {post.owner || "Anonymous"}</p>
            {Actions && Actions(post)} {/* Render the actions component */}

          </div>
        ))}
      </div>
    </main>
  );
};


