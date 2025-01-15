import BookItem from "@/components/book-item";
import { BookData } from "@/types";

//이렇게 하면 static 페이지가 되어 쿼리스트링 같은 값들은 다 undefined로 설정됨 -> 검색기능 제대로 동작 불가
//export const dynamic = "force-static";
//error 로 설정하면 빌드타임에 오류를 발생하도록 함
//export const dymanic = "error";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
