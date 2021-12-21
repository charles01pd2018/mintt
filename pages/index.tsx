// dependencies
import Head from 'next/head';
import Image from 'next/image';
// layout
import { DefaultLayout } from 'layout';
// components
import { GiftCard } from 'components';
import { LinkButton } from 'elements';

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

  const PLAYLIST_LINK = 'https://open.spotify.com/playlist/0XYMRycHTDVrS0SRaP2KjZ?si=qc0WrfLaTSaL7ZaSO0kkWw';

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
              1 Year
            </h1>
            <div className='gift-card-code'>
              Ho Ho Ho
            </div>
            <div className='gift-card-msg'>
              Click around to bring musical christmas joys
            </div>
          </GiftCard>
          <LinkButton className='gift-card-link' content={{
              text: 'See Your Starter Playlist!'
            }} href='https://open.spotify.com/playlist/0XYMRycHTDVrS0SRaP2KjZ?si=qc0WrfLaTSaL7ZaSO0kkWw'
            size='lg' color='alice-blue' />
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