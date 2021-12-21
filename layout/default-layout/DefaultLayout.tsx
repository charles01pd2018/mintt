// dependencies
import { FC } from 'react';
import { ISourceOptions } from 'tsparticles';
// hooks
import { useAudio } from 'hooks';
// lib
import { getRandomInt } from 'lib';
// installed components
import Particles from "react-tsparticles";

/* CONSTANTS */
const CHARACTERS = [
    'L',
    'I',
    'Z',
    '❄️',
    '🎅',
    '🎄',
    '🎁',
];

const options: ISourceOptions = {
    background: {
      color: {
        value: "#fff",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 30,
        },
        push: {
          quantity: 3,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#9eedff",
      },
      links: {
        color: "#52bdfa",
        distance: 100,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 35,
      },
      opacity: {
        value: 0.9,
      },
      shape: {
        type: 'char',
        options: {
            character: {
                value: CHARACTERS,
            },
        },
      },
      size: {
        random: true,
        value: 50,
      },
    },
    detectRetina: true,
};

const music = [
    '/static/music/christmas-knocking.mp3',
    '/static/music/jazz-jingle-bells.mp3',
    '/static/music/simp-jingle-bells.mp3',
    '/static/music/violin-jingle-bells.mp3',
];

/* TYPES */
interface DefaultLayoutProps {
    song?: number;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({
    children,
    song=getRandomInt( 4 ),
}) => {

    const toggleAudio = useAudio( music[ song ] );

    const playSong = () => {
        toggleAudio();
    }

    return (
        <div className='default-layout'>
            <div onClick={playSong} style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}/>
            <Particles id="tsparticles" options={options} />
            <main className='site-content'>{children}</main>
        </div>
    );
}

export default DefaultLayout;