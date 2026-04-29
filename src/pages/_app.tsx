import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */
const DEFAULT_SEO = {
  title: "최가인 | Backend Engineer",
  description: "안녕하세요, 백엔드 개발자 최가인입니다.",
  canonical: "https://www.naver.com/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.naver.com/",
    title: "최가인 | Backend Engineer",
    site_name: "최가인 | Backend Engineer",
    images: [
      {
        url: "/share.png",
        width: 285,
        height: 167,
        alt: "최가인 | Backend Engineer",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "최가인 | Backend Engineer",
    },
    {
      name: "msapplication-tooltip",
      content: "최가인 | Backend Engineer",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
