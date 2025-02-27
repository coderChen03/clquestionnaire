import { FC } from "react";
import Head from "next/head";
import Script from "next/script";

import style from "./index.module.scss";

type PageWrapperType = {
  title: string;
  desc?: string;
  css?: string;
  js?: string;
  children: React.ReactNode;
};

const PageWrapper: FC<PageWrapperType> = (props) => {
  const { title, desc = "", css = "", js = "", children } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{css}</style>
      </Head>
      <main className={style.container}>{children}</main>
      <Script id="page-id">{js}</Script>
    </>
  );
};

export default PageWrapper;
