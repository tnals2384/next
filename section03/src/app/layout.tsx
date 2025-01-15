import "@/app/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
          <footer className="py-[100px] text-gray-500 text-center">
            제작 @winterlood
          </footer>
        </div>
      </body>
    </html>
  );
}
