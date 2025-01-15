"use client";

import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  
  //isPending true: 이 서버액션이 종료되지않음 -> loading을 띄우기
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  
  return (
    <section className="flex flex-col gap-4">
      <form className="flex flex-col gap-[5px]" action={formAction}>
        <input
          className="w-full h-[100px] resize-y p-[10px] box-border border-solid border-gray-300 border-[1px] border-r-[5px]"
          name="bookId"
          value={bookId}
          hidden
          readOnly
        />
        <textarea disabled={isPending}
          className="w-full h-[100px] resize-y p-[10px] box-border border-solid border-gray-300 border-[1px] border-r-[5px]"
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className="flex justify-end gap-[5px]">
          <input disabled={isPending}
            className="p-[10px] box-border border-solid border-gray-300 border-[1px] border-r-[5px]"
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending}
            className="w-[80px] p-[10px] bg-blue-400 text-white border-none border-r-[5px] cursor-pointer"
            type="submit"
          >
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
