//import "./index.css"; 오류 발생. 외부 css 파일을 불러올 수 없음. 앱컴포넌트에서만 css를 불러올 수 있음

//css 파일을 쓸거면 아래와 같이 임포트해야함 CSS Module
//import style from "./index.module.css";
import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";
import { ReactNode, useEffect } from "react";
import Head from "next/head";

/*
//서버에서 한 번(함수실행),브라우저에서 한번(수화) 총 2번 컴포넌트가 호출됨
//1. 요청이 들어옴
//2. 함수 실행
//3. 페이지 컴포넌트 실행
export const getServerSideProps = async () => {
  //컴포넌트보다 먼저 실행되어, 컴포넌트에 필요한 데이터를 불러오는 함수

  console.log("서버사이드프롭스에요"); //오직 서버측에서만 실행되는 함수이므로, 브라우저에 표현되지 않음. 우리 터미널에서만 출력됨

  const [allBooks, recoBooks] = await Promise.all([ //병렬로 작동
    fetchBooks(),
    fetchRandomBooks(),
  ]);
*/


export const getStaticProps = async () => {
  //넥스트의 개발 모드로 실행하면 그냥 계속 새로 사전렌더링됨
  console.log("인덱스 페이지"); //원래는 딱 한번 콘솔에 출력되고, 새로고침하면 표시되면 안됨
  const [allBooks, recoBooks] = await Promise.all([
    //병렬로 작동
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      //리턴에는 꼭 props가 있어야함
      allBooks,
      recoBooks,
    },
    //revalidate : 3, //ISR 사용하기 : 유통기한을 초단위로 적음
  };
}; //약속된 이름의 함수로 내보내면 알아서 서버사이드렌더링으로 동작하게됨

//InferGetServerSidePropsType으로 타입추론이 가능
export default function Home({
  allBooks,
  recoBooks,
}: //}: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  //브라우저에서만 실행되는 함수
  //마운팅된 이후 호출되므로
  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <>
    <Head>
      <title>한입북스</title>
      <meta property="og:image" content="/thumbnail.png "/>
      <meta property="og:title" content="한입북스" />
      <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요." />
    </Head>
    <div className="flex flex-col gap-[20px]">
      <section>
        <h3 className="mb-0">지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3 className="mb-0">등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
    </>
  );
}

//페이지를 받아와서 별도의 레이아웃으로 감싸진 형식을 리턴하는 역할의 함수
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
