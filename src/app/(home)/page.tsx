import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
          <p className="text-gray-400">Choose an option to continue</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Register
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
