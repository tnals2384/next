import GlobalLayout from "@/components/global-layout";

import type { AppProps } from "next/app";
import { ReactNode } from "react";

import "@/styles/globals.css";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode; //getLayout이 없을 경우를 위한 ?
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  //특정 조건이 만족했을 때 .. 등등 페이지 내부에서도 CSR 가능
  /*const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
    router.replace("/test"); //뒤로가기 방지
    router.back(); //뒤로가기
  };
  

  //프리페칭을 하고 싶을 때
  useEffect(() => {
    router.prefetch("/test");
  }, []);
  */

  //getLayout이 적용되지 않는 페이지에는 예외처리를 해주어야 함
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
