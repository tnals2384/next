import { ReactNode } from "react";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white max-w-[600px] min-h-screen mx-auto shadow-lg px-4">
      <header className="h-[60px] font-bold text-lg leading-[60px]">
        <Link href="/" className="text-black no-underline">
          📚 ONEBITE BOOKS
        </Link>
      </header>

      <main className="pt-2">{children}</main>

      <footer className="py-[100px] text-gray-500 text-center">
        제작 @winterlood
      </footer>
    </div>
  );
}
