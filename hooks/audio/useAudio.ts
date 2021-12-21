// dependencies
import { useState, useEffect, useRef } from 'react';

export interface Options {
    play?: boolean;
}

/**
 * Returns toggle audio function that toggles audio depending on the given play state.
 * Note that many browsers DO NOT allow audio to play on page render.
 */
const useAudio = (
    src: string,
    options: Options={},
) => {

    /* CONTENT */
    const audio = useRef<null | HTMLAudioElement>( null );
    // by default, audio does not play
    const { play=false } = options;

    /* HOOKS */
    const [ isPlay, setIsPlay ] = useState<boolean>( play );

    /* FUNCTIONS */
    const toggleAudio = (
        toggleType: ( 'pause' | 'play' | undefined )=undefined,
    ) => {
        if ( toggleType === 'pause' ) {
            audio.current?.pause();
            setIsPlay( false );
        }
        else if ( toggleType === 'play' ) {
            audio.current?.play();
            setIsPlay( true );
        }
        else {
            if ( isPlay ) 
                audio.current?.pause();
            else
                audio.current?.play();
            
            setIsPlay( state => !state );
        }
        
    }

    const pauseAudio = () => {
        toggleAudio( 'pause' );
    }

    useEffect(() => {
        audio.current = new Audio( src );
        // play song on component render if isPlay is true
        isPlay ? audio.current.play() : audio.current.pause();
        
        audio.current.addEventListener( 'ended', pauseAudio );
        return () => {
          audio.current?.removeEventListener( 'ended', pauseAudio );
        };
      }, []);

    return toggleAudio;
}

export default useAudio;