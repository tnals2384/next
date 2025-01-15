import { ReviewData } from "@/types";
import ReviewItemDeleteButton from "./review-item-delete-button";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg shadow-sm">
      {/* 작성자 정보 */}
      <div className="text-sm font-semibold">{author}</div>
      {/* 리뷰 내용 */}
      <div className="bg-gray-100 p-4 rounded-lg">{content}</div>
      {/* 하단 정보 */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}
