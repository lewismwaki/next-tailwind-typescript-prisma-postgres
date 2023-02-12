import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  userId: number;
  user: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const getPost = async (): Promise<void> => {
      const res = await fetch(`/api/posts/${router.query.id as string}`);
      const data = (await res.json()) as Post;
      setPost(data);
    };
    getPost().catch((e) => console.log(e));
  }, [router.query.id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          /posts/{router.query.id}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <p className="text-md font-semibold">#{post?.id}</p>
            <h3 className="text-2xl font-bold">{post?.title} →</h3>
            <div className="text-lg">{post?.content}</div>
            <p className="py-2 font-mono text-xl font-bold italic tracking-tight ">
              authored by {post?.user?.name}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;
