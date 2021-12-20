// dependencies
import { useEffect } from 'react';
// types
import type { AppProps } from 'next/app';
// styles
import 'styles/styles.scss'

const MyApp = ({ Component, pageProps }: AppProps ) => {

  useEffect( () => {
    document.body.classList?.remove( 'loading' );
  }, [] );

  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
