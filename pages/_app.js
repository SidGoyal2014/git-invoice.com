import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"; // Adjust the path if needed
import { NavbarComponent } from "@/components/navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", "G-LMPFE3HNY9", {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Track the initial page load
    handleRouteChange(window.location.pathname);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <NavbarComponent />
      <Component {...pageProps} />

      {/* Google Analytics Script */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-LMPFE3HNY9`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LMPFE3HNY9', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
     
    </SessionProvider>
  );
}
