import SearchableLayout from "@/components/searchable-layout";
import { ReactNode} from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
//import { useRouter } from "next/router";
//import { BookData } from "@/types";

//쿼리스트링이 필요한 건 getStaticProps 사용 불가함!!!
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);
  return {
    props: {
      books,
    },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /*이렇게 하면 리액트 식으로 동작하게 됨. ssg방식으로 동작
    const [books, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if(q) {
            fetchSearchResult();
        }
    }, [q]);
    */
  return (
    <div>
      <Head>
      <title>한입북스</title>
      <meta property="og:image" content="/thumbnail.png "/>
      <meta property="og:title" content="한입북스" />
      <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요." />
    </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
