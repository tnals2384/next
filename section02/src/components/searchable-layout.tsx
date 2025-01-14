import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string; //기본적으로는 string, string[] , undefined로 추론됨

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
    <div>
      <div className="flex gap-[10px] mb-[20px]">
        <input
          className="flex-1 p-[15px] rounded-[5px] border border-[rgb(220,220,220)]"
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요 ..."
        />
        <button
          className="w-[80px] rounded-[5px] border-none bg-[rgb(37,147,255)] text-white cursor-pointer"
          onClick={onSubmit}
        >
          검색
        </button>
        </div>
        {children}
    </div>
  );
}
