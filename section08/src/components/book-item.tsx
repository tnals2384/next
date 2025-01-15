// book-item.tsx (Next.js + Tailwind)
import type { BookData } from "@/types";
import Link from "next/link";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link
      href={`/book/${id}`}
      className="flex gap-4 p-5 border-b border-gray-300 text-black no-underline"
    >
      <img src={coverImgUrl} alt={title} className="w-20" />
      <div>
        <div className="font-bold">{title}</div>
        <div className="break-keep">{subTitle}</div>
        <br />
        <div className="text-gray-500">
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
