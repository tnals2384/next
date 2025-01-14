import type { BookData } from "@/types";
import Link from "next/link";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link
      href={`/book/${id}`}
      className="flex gap-[15px] py-[20px] px-[10px] border-b-grey border-b-solid border-b-[1px] text-black decoration-none"
    > 
      <img src={coverImgUrl} className="w-[80px]" />
      <div>
        <div className="font-bold">{title}</div>
        <div className="break-words">{subTitle}</div>
        <br />
        <div className="text-gray-500">
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
