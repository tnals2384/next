import ReviewEditor from "@/components/review-editor";
import ReviewList from "@/components/review-list";
import { BookData } from "@/types";
import { notFound } from "next/navigation";

//export const dynamicParams = false; //이렇게 설정하면, generateStaticParams에 없는 id로 요청을 하면 404페이지로 이동한다.


//현재 있는 모든 책의 상세 페이지를 미리 만들어두도록 설정
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();

  return books.map((book) => ({ id: book.id.toString() }));
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const book = await response.json();
  //구조분해
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section className="flex flex-col gap-[10px]">
      {/* 커버 이미지 컨테이너 */}
      <div
        className="flex justify-center p-5 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* 어둡게 오버레이 */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70"></div>
        <img
          src={coverImgUrl}
          alt={title}
          className="z-10 max-h-[350px] h-full"
        />
      </div>

      {/* 책 정보 */}
      <div className="text-lg font-bold">{title}</div>
      <div className="text-gray-500">{subTitle}</div>
      <div className="text-gray-500">
        {author} | {publisher}
      </div>

      {/* 설명 */}
      <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-line leading-relaxed">
        {description}
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();
  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-[50px]">
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
