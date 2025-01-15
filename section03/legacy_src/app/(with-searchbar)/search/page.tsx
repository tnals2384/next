export default async function Page({ //리액트의 서버 컴포넌트이므로 async 키워드를 붙일 수 있다.
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search 페이지</div>;
}
