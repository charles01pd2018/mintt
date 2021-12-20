/**
 * Returns the width and height for a given target bounding rectangle
 */
 const getRectSize = ( rect: DOMRect ) => {
    return [ rect.width, rect.height ]; 
}

export default getRectSize;