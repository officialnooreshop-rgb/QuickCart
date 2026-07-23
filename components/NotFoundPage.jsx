import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 py-16">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#f2e1b8] bg-white p-8 text-center shadow-[0_18px_45px_rgba(184,134,11,0.12)] md:p-12">
        <p className="text-7xl font-black tracking-tight text-[#b8860b]">404</p>
        <h1 className="mt-4 text-2xl font-bold text-[#1E2A38] md:text-3xl">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="mt-7 inline-flex rounded-full bg-[#B8860B] px-7 py-3 font-semibold text-white transition hover:bg-[#A7780A]">
          Return home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
