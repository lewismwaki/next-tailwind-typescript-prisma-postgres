import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>really cool fullstack app</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            really cool{" "}
            <span className="text-[hsl(280,100%,70%)]">fullstack</span> app
          </h1>
          <p className="sm:text- text-lg font-semibold tracking-tight text-white">
            built w/
            <span className="text-[hsl(280,100%,70%)]">
              {" "}
              Next.js Tailwind Typescript Prisma PostgresSQL Railway
            </span>
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white transition-all hover:bg-white/20 hover:tracking-wide"
              href="/posts"
            >
              <h3 className="text-2xl font-bold">Posts →</h3>
              <div className="text-lg">Page for listing all posts.</div>
              <div className="text-base">api/posts</div>
            </Link>

            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white transition-all hover:bg-white/20 hover:tracking-wide"
              href="/"
            >
              <h3 className="text-2xl font-bold">Users →</h3>
              <div className="text-lg">
                Page for listing all users. hits api/users
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
