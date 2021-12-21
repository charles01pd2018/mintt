// dependencies
import Head from 'next/head';
import Image from 'next/image';
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

  const distort = {
    xDistort: 24,
    yDistort: 16,
    shadowDistort: 12,
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

        <DefaultLayout>
          <GiftCard scale={1.1} distort={distort}>
            <Image src='/static/images/spotify-logo.png' 
              className='gift-card-logo'
              width={600} height={200} />
            <h1 className='gift-card-price'>
              $50
            </h1>
            <div className='gift-card-code'>
              CODE HERE
            </div>
            <div className='gift-card-msg'>
              Pls stop using my spotify
            </div>
          </GiftCard>
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