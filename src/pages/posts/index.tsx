import { Post } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      const res = await fetch("http://localhost:3000/api/posts");
      const posts = await res.json();
      setPosts(posts);
    };

    getPosts();
  }, []);

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            /posts
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {posts?.map((post) => (
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href={`/posts/${post.id}`}
              >
                <p className="text-md font-semibold">#{post.id}</p>
                <h3 className="text-2xl font-bold">{post.title} →</h3>
                <div className="text-lg">{post.content}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Posts;
