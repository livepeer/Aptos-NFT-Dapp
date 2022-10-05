import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AptosClient } from 'aptos';
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
import { useMemo } from 'react';


// export const AptosContext = createContext<AptosClient | null>(null);

function MyApp( { Component, pageProps }: AppProps ) {
  const client = createReactClient({
    provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API }),
  } );
  
  const aptosClient = useMemo(() => new AptosClient('https://fullnode.devnet.aptoslabs.com/v1'), []);


  return (
    // <AptosContext.Provider value={aptosClient}>
      <LivepeerConfig client={client}>
        <Component {...pageProps} />
      </LivepeerConfig>
    // </AptosContext.Provider>
  );
}

export default MyApp;
