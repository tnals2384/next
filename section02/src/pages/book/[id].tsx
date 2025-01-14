import fetchOneBook from "@/lib/fetch-one-book";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

/*
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id; //undefined가 아닐거라고 ! 단언

  const book = await fetchOneBook(Number(id)); //타입을 변환하여 number type으로 넘김
  return {
    props: {
      book,
    },
  };
};
*/

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    //만약 위 파라미터가 아닌 다른애들이 들어올 때에 대한대체, 대비책, 보험
    //fallback: false, //무조건 404 NOT FOUND 반환
    //fallback: "blocking", //즉시 생성 (Like SSR)
    fallback: true, //SSR + 데이터가 없는 폴백 상태의 페이지부터 반환. 그뒤에 데이터를 후속으로 받음
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; //undefined가 아닐거라고 ! 단언

  const book = await fetchOneBook(Number(id)); //타입을 변환하여 number type으로 넘김

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  //fallback:true로 선택했을 경우, 로딩중이면 메타데이터도 아무값도 안들어가게됨. 따라서 이와 같이 따로 정의해주어야함
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png " />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요."
          />
        </Head>
        <div>로딩중.. --//fallback 상태일때는 로딩중 문구 표시</div>
      </>
    );
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="flex flex-col gap-[10px]">
        <div
          className="flex justify-center p-[20px] bg-center bg-no-repeat bg-cover relative
        before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-70"
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img className="z-10 max-h-[350px] h-full" src={coverImgUrl} />
        </div>
        <div className="text-lg font-bold"> {title}</div>
        <div className="text-gray-500">{subTitle}</div>
        <div className="text-gray-500">
          {author} | {publisher}
        </div>
        <div className="bg-gray-50 p-[15px] leading--[1.3] whitespace-pre-line rounded-[5px]">
          {description}
        </div>
      </div>
    </>
  );
}
