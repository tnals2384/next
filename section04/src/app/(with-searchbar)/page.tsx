import BookItem from "@/components/book-item";
import { BookData } from "@/types";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {cache : "no-store"} //캐싱되지 않는 요청
    
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    //{cache : "force-cache"} 
    {next: {revalidate:3}} //3초마다 변경

  );
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  //서버 컴포넌트이기 때문에, 서버 콘솔에서만 보여짐

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="mb-0 text-xl font-semibold">지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3 className="mb-0 text-xl font-semibold">등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
