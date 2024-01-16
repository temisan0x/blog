"use client";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store, { persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "../../components/ThemeProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const pageKey = router.asPath;

  return (
    <SessionProvider session={session}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Head>
              <title>Temycodes</title>
              <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
              <meta
                name="google-site-verification"
                content="googlebc9934976d614e3f"
              />
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
          </ThemeProvider>
          <Component {...pageProps} key={pageKey} />
      </PersistGate>
    </Provider>
        </SessionProvider>
  );
}
