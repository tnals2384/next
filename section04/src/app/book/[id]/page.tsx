export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const book = await response.json();
  //구조분해
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
}
