import Link from 'next/link';
import "./style/globals.css";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fff7ec] px-4">
      <h1 className="text-7xl font-extrabold text-[#ffab19] drop-shadow-sm">404</h1>
      <p className="text-2xl mt-4 text-gray-800 font-medium">
        Page not found
      </p>
      <p className="text-md mt-2 text-gray-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 bg-[#ffab19] text-white text-lg font-semibold px-6 py-3 rounded-xl hover:bg-[#e39a15] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}
