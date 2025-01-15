"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    //이 페이지를 다시 생성해줄 것을 요청 (재검증) 페이지의 모든 컴포넌트가 다 다시 렌더링됨
    //오직 서버측에서만 호출 가능
    //이 페이지에 포함된 모든 캐시 무효화!!
    // //1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // //2. 특정 경로의 모든 동적 페이지 재검증
    // revalidatePath("/book/[id]", "page"); //파일 경로 명시

    // //3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // //4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    //5.태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: "에러가 발생했습니다.",
    };
  }
}
