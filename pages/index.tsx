// dependencies
import Head from 'next/head';
// layout
import { DefaultLayout } from 'layout';
// components
import { GiftCard } from 'components';

/* TYPES */
interface Content {
  pageTitle: string;
};

interface Props {
  content: Content;
};

const Home = ( {
  content: {
    pageTitle,
  },
}: Props ) => {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

        <DefaultLayout>
        </DefaultLayout>
    </>
  
  );
}

const HomeContent = {
  pageTitle: 'Merry Christmas!',
};

export async function getStaticProps() {
  return {
    props: {
      content: HomeContent,
    }
  }
}

export default Home;