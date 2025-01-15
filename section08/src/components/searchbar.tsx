"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
  const router = useRouter(); 
  //앱라우터에는 라우터객체에 query가 제공되지 않기 때문에, useSearchParams()를 이용해야함
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-2 mb-5">
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className="flex-1 p-4 border border-gray-300 rounded-lg"
        placeholder="검색어를 입력하세요"
      />
      <button
        onClick={onSubmit}
        className="w-20 rounded-lg border-none bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
      >
        검색
      </button>
    </div>
  );
}
