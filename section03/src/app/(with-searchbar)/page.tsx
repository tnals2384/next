// page.tsx (Next.js + Tailwind)
import BookItem from "@/components/book-item";
import books from "@/mock/books.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="mb-0 text-xl font-semibold">지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3 className="mb-0 text-xl font-semibold">등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
