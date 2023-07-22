import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  // aparently this doesn't return Promise
  const { userId } = auth();

  const href = userId ? "/journal" : "/new-user";
  //
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-md mx-3">
        <h1 className="text-3xl select-none">
          <span className="text-primary text-4xl">Feel-AI:</span> Your Personal
          Emotional Journal
        </h1>
        <p className="text-xl mt-3 select-none">
          Welcome to Feel-AI, the revolutionary journal app powered by
          artificial intelligence. Express your feelings and let our advanced AI
          analyze your texts to provide insights, positivity, and even solutions
          to help you navigate your emotions. Start your journey of
          self-discovery and emotional well-being today with Feel-AI!
        </p>
        <div className="mt-3">
          {/* @ts-expect-error RSC */}
          <Link href={href} className="btn btn-primary">
            Start Journaling Now
          </Link>
        </div>
      </div>
    </div>
  );
}
