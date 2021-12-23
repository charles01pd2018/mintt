// dependencies
import { useEffect, RefObject } from 'react';

/* TYPES */
type TapEvent = MouseEvent | TouchEvent;

/**
 * Custom pointer move function - certain broswers don't support all functionalities.
 * i.e firefox
 */
 const usePointerMove = <T extends HTMLElement>(
    ref: RefObject<T>,
    fn: ( event: TapEvent ) => void,
) => {

    useEffect( () => {
        const target = ref.current as HTMLElement;

        target.addEventListener( 'mousemove', fn );
        target.addEventListener( 'touchmove', fn );
        return () => {
            target.removeEventListener( 'mousemove', fn );
            target.removeEventListener( 'touchmove', fn );
        }
    }, [] );
}

export default usePointerMove;