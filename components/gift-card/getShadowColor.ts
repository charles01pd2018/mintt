// types
import { Shadow } from './types';
// lib
import { colors, shadow } from 'lib';


const getShadowColor = ( color: Shadow ) => {
    let DROP_SHADOW_COLOR: string;

    if ( color === 'shadow' )
        DROP_SHADOW_COLOR = shadow[ 2 ];
    else
        DROP_SHADOW_COLOR = colors[ color ][ 2 ];
    
    return DROP_SHADOW_COLOR;
}

export default getShadowColor;