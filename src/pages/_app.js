import "@/styles/globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
import { ActivePageProvider } from "@/context/ActivePageContext";

import Transition from "@/components/Transition";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <ActivePageProvider>
        <TransitionProvider>
          <Transition>
            <Component key={router.route} {...pageProps} />
          </Transition>
        </TransitionProvider>
      </ActivePageProvider>
    </>
  );
}
