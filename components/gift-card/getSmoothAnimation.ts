// types
import { Distort, Scale, Displace, SmoothAnimation } from './types';
// lib
import { getRectSize } from 'lib';

/**
 * Returns styling for smooth animation
 */
const getSmoothAnimation = (
    target: HTMLElement,
    shadowColor: string,
    animationDuration: number=5000, // number in milliseconds it will take the gift card to make one full circular rotation
    distort: Distort={},
    scale: Scale={
        xScale: 1.5,
        yScale: 1.5,
    },
): SmoothAnimation => {

    const rect = target.getBoundingClientRect();

    /* CONTENT */
    const {
        xDistort=6,
        yDistort=4,
        shadowDistort=3,
    } = distort;

    // dimensions of the gift card
    const [ width, height ] = getRectSize( rect );
    // half dimensions of the gift card
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    // getting animation depth
    const { center, animate } = calcAnimations( target, scale );
    const [ xCenter, yCenter ] = center;
    const [ xAnimate, yAnimate ] = animate;

    const getAngle = ( 
        type: 'angle' | 'shadow',
        displace: Displace={}
    ): { [ key: string ] : number } => {
        /* CONTENT */
        const { xDisplace=0, yDisplace=0 } = displace;

        if ( type === 'angle' ) return {
            x: ( xCenter + xDisplace - halfWidth ) / xDistort,
            y: ( yCenter + yDisplace - halfHeight) / yDistort,
        }
        else if ( type === 'shadow' ) return {
            x: ( xCenter + xDisplace - halfWidth ) / shadowDistort,
            y: ( yCenter + yDisplace - halfHeight ) / shadowDistort,
        }
        else throw( TypeError(`Incorrect type specified: ${type}`) );
    }

    const keyframes = [
        // I -> -x, +y
        {
            transform: `rotateY(${getAngle( 'angle', { xDisplace: -xAnimate } ).x}deg) rotateX(${getAngle( 'angle', { yDisplace: yAnimate } ).y}deg)`,
            filter: `drop-shadow(${-getAngle( 'shadow', { xDisplace: -xAnimate } ).x}px ${getAngle( 'angle', { yDisplace: yAnimate } ).y}px 15px ${shadowColor})`,
        },
         // II -> +x, +y
        {
            transform: `rotateY(${getAngle( 'angle', { xDisplace: xAnimate } ).x}deg) rotateX(${getAngle( 'angle', { yDisplace: yAnimate } ).y}deg)`,
            filter: `drop-shadow(${-getAngle( 'shadow', { xDisplace: xAnimate } ).x}px ${getAngle( 'angle', { yDisplace: yAnimate } ).y}px 15px ${shadowColor})`,
        },
        // III -> +x, -y
        {
            transform: `rotateY(${getAngle( 'angle', { xDisplace: xAnimate } ).x}deg) rotateX(${getAngle( 'angle', { yDisplace: -yAnimate } ).y}deg)`,
            filter: `drop-shadow(${-getAngle( 'shadow', { xDisplace: xAnimate } ).x}px ${getAngle( 'angle', { yDisplace: -yAnimate } ).y}px 15px ${shadowColor})`,
        },
        // IV -> -x, -y
        {
            transform: `rotateY(${getAngle( 'angle', { xDisplace: -xAnimate } ).x}deg) rotateX(${getAngle( 'angle', { yDisplace: -yAnimate } ).y}deg)`,
            filter: `drop-shadow(${-getAngle( 'shadow', { xDisplace: -xAnimate } ).x}px ${getAngle( 'angle', { yDisplace: -yAnimate } ).y}px 15px ${shadowColor})`,
        },
    ];

    const animation = target.animate( keyframes, {
        duration: animationDuration,
        iterations: Infinity,
        direction: 'alternate',
        fill: 'both',
    } );

    return {
        animation,
        perspective: `${halfWidth * 3}px`,
    }
}

// calculates the animation depth for the x and y directions
const calcAnimations = (
    target: HTMLElement,
    scale: Scale,
): { [ key: string ]: number[] } => {

    const rect = target.getBoundingClientRect();

    /* CONTENT */
    const { xScale, yScale } = scale;

    // very bottom right coordinates
    const xRight = rect.right - rect.left;
    const yRight = rect.bottom - rect.top;
    // center coordinates
    const xCenter = xRight / 2;
    const yCenter = yRight / 2;
    // subtract very center coordinates from very bottom right coordinates -> thats the max distance we can animate
    const xMax = xRight - xCenter;
    const yMax = yRight - yCenter;
    // scale the max distance
    const xAnimate = xMax / xScale;
    const yAnimate = yMax / yScale;

    return {
        center: [ xCenter, yCenter ],
        animate: [ xAnimate, yAnimate ],
    };
}

export default getSmoothAnimation;