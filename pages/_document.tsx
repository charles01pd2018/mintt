import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head >
          {/* Site Logo */}
          <link rel="icon" href="/favicon.gif" />
          {/* Imported Fonts -- MIGHT NOT NEED PRELOAD WITH NEXT.JS 10.2 */}
          <link rel="preload" href="/static/fonts/mullish/Mullish-Medium.ttf" as="font" crossOrigin="" /> 
        </Head>
        <body className='loading'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;