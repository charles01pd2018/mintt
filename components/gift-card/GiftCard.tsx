// dependencies
import { FC, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// types
import { TapEvent, ReactTapEvent, ConditionalProps } from 'types';
import type { Distort, Styles, ParentStyles, SmoothAnimationStyles, Shadow } from './types';
// hooks
import { usePointerMove } from 'hooks';
// lib
import { getClientCoords, getRectSize } from 'lib';
// partial functions
import getSmoothAnimation from './getSmoothAnimation';
import getShadowColor from './getShadowColor';


/* TYPES */
type Props = ConditionalProps<
    {
        // customization
        id?: string;
        className?: string;
        // styling
        distort?: Distort;
        isRounded?: boolean;
        scale?: number; // how much to scale the ticke on hover
        smoothAnimate?: boolean; // whether to continuously animate the gift card with the smooth animation effect
        showAnimate?: boolean; // whether to continuously animate the gift card with the show off animation effect
        animateInterval?: number; // how long to wait before making the next show animation
        sparkle?: boolean; // adds a sparkle effect to the gift card
        shadow?: Shadow;
    }, 
        'smoothAnimate',
    {
        // if smoothAnimate is set to true, showAnimate cannot be true
        smoothAnimate: true;
        showAnimate: false;
    }  | 
    {
        // if showAnimate is set to true, smoothAnimate cannot be true
        showAnimate: true;
        smoothAnimate: false;
    }
>

/**
 * 3D gift card that follows pointer cursor on hover and has the option to continuously animate.
 * Can pass buttons or any other element type in as children for this component.
 */
const GiftCard: FC<Props> = ( {
    children,
    id,
    className='',
    distort={},
    isRounded=true,
    scale=1.15,
    smoothAnimate=false,
    showAnimate=true,
    animateInterval=6000,
    sparkle=true,
    shadow='orange',
} ) => {

    /* ERRORS */
    if ( smoothAnimate && showAnimate ) 
        throw( TypeError('smoothAnimate and showAnimate cannot be both set to true at the same time') );

    /* CONSTANTS */
    const DEBOUNCE_TIME = 1500;
    const DROP_SHADOW_COLOR = getShadowColor( shadow );

    /* HOOKS */
    const ref = useRef<HTMLElement>( null );
    
    // styling
    const [ styles, setStyles ] = useState<Styles | {}>( {} );
    const [ parentStyles, setParentStyles ] = useState<ParentStyles | {}>( {} );
    // smooth animation
    const [ smoothAnimationStyles, setSmoothAnimationStyles ] = useState<SmoothAnimationStyles | {}>( {} );
    const [ smoothAnimation, setSmoothAnimtion ] = useState<Animation | null>( null );
    // show off animation
    const [ isShowAnimate, setIsShowAnimate ] = useState<boolean>( showAnimate );
    const [ animateIntervalID, setAnimateIntervalID ] = useState<NodeJS.Timer | null>( null )

    /* FUNCTIONS */
    const smoothAnimateGiftCard = () => {
        setStyles( smoothAnimationStyles );

        smoothAnimation!.play();
    }

    // animate the gift card after 1.5 seconds of interacting with it
    const debounceShowAnimate = useDebouncedCallback( () => {
        setIsShowAnimate( true );
    }, DEBOUNCE_TIME );

    const startShowAnimationInterval = ( delay: number=0 ) => {
        const animationInterval = setInterval( () => {
            setIsShowAnimate( false );
            setTimeout( () => setIsShowAnimate( true ), 100 );
        }, animateInterval + delay );

        setAnimateIntervalID( animationInterval );
    }

    const reset = () => {
        if ( smoothAnimate ) smoothAnimateGiftCard();
        else setStyles( {
               transform: `rotateX(0deg) rotateY(0deg) scale(1)`,
               filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
           } );
        if ( showAnimate ) {
            debounceShowAnimate();
            startShowAnimationInterval( DEBOUNCE_TIME );
        }
    }
   
    const initGiftCard = ( target: HTMLElement ) => {
        const rect = target.getBoundingClientRect();

        setStyles( {
            filter: `drop-shadow(0 10px 15px ${DROP_SHADOW_COLOR})`,
        } );
        setParentStyles( {
            perspective: `${rect.width}px`,
        } );

        if ( smoothAnimate ) {
            const { animation, ...styles } = getSmoothAnimation( ref.current as HTMLElement, DROP_SHADOW_COLOR );
            
            setSmoothAnimtion( animation );
            setSmoothAnimationStyles( styles );
        }

        if ( showAnimate )
            startShowAnimationInterval();
    }

    const make3D = ( 
        event: ReactTapEvent | TapEvent,
        distort: Distort,
        type: ( 'enter' | null )=null,
    ): void => {
        if ( showAnimate ) {
            setIsShowAnimate( false );

            if ( animateIntervalID )
                clearInterval( animateIntervalID );
        }

        // pause the animation
        if ( type === 'enter' && smoothAnimate ) 
            smoothAnimation!.pause();

        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();

        /* CONTENT */
        // default distort values are suitable for smaller buttons
        // make values bigger for bigg sized elements
        const {
            xDistort=6,
            yDistort=4,
            shadowDistort=3,
        } = distort;

        // TO-DO - test this on a mobile device
        // get the client coordinates for either Mouse or Touch Event
        const [ clientX, clientY ] = getClientCoords( event );
        // dimensions of the gift card
        const [ width, height ] = getRectSize( rect );
        // half dimensions of the gift card
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        
        // position of user's pointer relative to gift card
        const x = Math.abs( rect.x - clientX );
        const y = Math.abs( rect.y - clientY );

        // angles to distort the gift card
        const angleX = ( x - halfWidth ) / xDistort;
        const angleY = ( y - halfHeight ) / yDistort;

        // new shadows relative to cursor
        const xShadow = ( x - halfWidth ) / shadowDistort;
        const yShadow = ( y - halfHeight ) / shadowDistort;

        const styles = {
            transform: `rotateX(${angleY}deg) rotateY(${angleX}deg) scale(${scale})`,
            perspective: `${halfWidth * 3}px`,
            filter: `drop-shadow(${-xShadow}px ${yShadow}px 15px ${DROP_SHADOW_COLOR})`,
        };

        setStyles( styles );
    }

    /* CLASSNAMES */
    const giftCardClasses = `
        gift-card-wrapper
        ${className}
        ${isRounded ? 'rounded ': ''}
        ${isShowAnimate ? 'show-animate' : ''}
        ${sparkle ? 'sparkle' : ''}
    `;

    useEffect( () => {
        const target = ref.current as HTMLElement;

        // load initial styles and target rect
        initGiftCard( target );
    }, [] );

    // the default pointerMove does not work in Firefox - using more complete one
    usePointerMove( ref, ( event ) => make3D( event, distort ) );

    return (
        <section id={id} ref={ref} className='gift-card-container' style={parentStyles}
            onPointerEnter={( event ) => make3D( event, distort, 'enter' )} onPointerLeave={reset}>
            <div className={giftCardClasses} style={styles} >{children}</div>
        </section>
    )
}

export default GiftCard;