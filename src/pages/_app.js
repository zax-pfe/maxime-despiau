import "@/styles/globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
import { ActivePageProvider } from "@/context/ActivePageContext";
import { IsLoadingProvider } from "@/context/IsLoadingContext";

import Transition from "@/components/Transition";

import Head from "next/head";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Maxime Despiau - Freelance Photographer | Portfolio</title>
        <meta
          name="description"
          content="Explore the portfolio of Maxime Despiau, a freelance photographer specializing in portraits, events, and creative projects."
        />
        <link rel="icon" href="/assets/icon/favicon.png" type="image/png" />
      </Head>
      <IsLoadingProvider>
        <ActivePageProvider>
          <TransitionProvider>
            <Transition>
              <Component key={router.route} {...pageProps} />
            </Transition>
          </TransitionProvider>
        </ActivePageProvider>
      </IsLoadingProvider>
    </>
  );
}
