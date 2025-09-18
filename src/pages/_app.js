import "@/styles/globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
import { ActivePageProvider } from "@/context/ActivePageContext";
import { IsLoadingProvider } from "@/context/IsLoadingContext";

import Transition from "@/components/Transition";

export default function App({ Component, pageProps, router }) {
  return (
    <>
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
