// types
import type { ReactTapEvent, TapEvent } from 'types';

/**
 * Handles clientX and clientY for both mouse and touch events.
 * For touch events, returns the last touch's clientX and clientY.
 */
const getClientCoords = (
    event: ReactTapEvent | TapEvent,
): [ number, number ] => {
    let clientX;
    let clientY;

    if ( 'targetTouches' in event ) {
        const targetTouches = event.targetTouches as TouchList;
        const lastIndex = targetTouches.length - 1;

        clientX = targetTouches[ lastIndex ].clientX;
        clientY = targetTouches[ lastIndex ].clientY;
    }
    else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    return [ clientX, clientY ];
}

export default getClientCoords;