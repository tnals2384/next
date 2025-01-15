"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      //모달의 배경이 클릭 되면 뒤로가기
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className="w-4/5 max-w-[500px] mt-5 border-r-[5px] border-none backdrop:bg-opacity-70 mx-auto bg-white bg-opacity-70"
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
