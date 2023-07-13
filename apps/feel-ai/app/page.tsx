import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-md mx-3">
        <h1 className="text-3xl">
          <span className="text-primary text-4xl">Feel-AI:</span> Your Personal
          Emotional Journal
        </h1>
        <p className="text-xl mt-3">
          Welcome to Feel-AI, the revolutionary journal app powered by
          artificial intelligence. Express your feelings and let our advanced AI
          analyze your texts to provide insights, positivity, and even solutions
          to help you navigate your emotions. Start your journey of
          self-discovery and emotional well-being today with Feel-AI!
        </p>
        <div className="mt-3">
          {/* @ts-expect-error RSC */}
          <Link href="/journal" className="btn btn-primary">
            Start Journaling Now
          </Link>
        </div>
      </div>
    </div>
  );
}
