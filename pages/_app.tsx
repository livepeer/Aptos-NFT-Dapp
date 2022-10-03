import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';


const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={client}>
      <Component {...pageProps} />
    </LivepeerConfig>
  );
}

export default MyApp;
