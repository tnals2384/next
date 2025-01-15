import BookItem from "@/components/book-item";
import { BookData } from "@/types";

//특정 페이지의 유형을 강제로 Static , Dynamic 페이지로 설정
//1. auto : 기본값, 아무것도 강제하지 않음
//2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
//3. force-static : 페이지를 강제로 Static 페이지로 설정
//4. error  : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류 발생시킴)
export const dynamic = "force-dynamic";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
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
    { next: { revalidate: 3 } } //3초마다 변경
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
