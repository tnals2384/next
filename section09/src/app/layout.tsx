import "@/app/globals.css";
import { BookData } from "@/types";
import Link from "next/link";
import { ReactNode } from "react";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache: "force-cache"}
  );
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer className="py-[100px] text-gray-500 text-center">
      <div>제작 @winterlood</div>

      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal : ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 m-0 p-0">
        <div className="max-w-[600px] min-h-screen mx-auto bg-white px-4 shadow-lg">
          <header className="h-[60px] font-bold text-lg leading-[60px]">
            <Link href="/" className="text-black no-underline cursor-pointer">
              📚 ONEBITE BOOKS
            </Link>
          </header>
          <main className="pt-2">{children}</main>
          <Footer/>
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
