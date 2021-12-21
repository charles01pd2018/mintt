/**
 * Safetly increment or decrement an array index.
 * Defaults to incrementing.
 */
const changeArrayIndex = (
    index: number,
    arrayLength: number,
    changeType: ( 'inc' | 'dec' )='inc',
) => {

    let newIndex;
    const LAST_INDEX = arrayLength - 1;

    if ( changeType === 'inc' ) {
        if ( index === LAST_INDEX )
            newIndex = 0;
        else
            newIndex = index + 1;
    }
    else if ( changeType === 'dec' ) {
        if ( index === 0 )
            newIndex = LAST_INDEX;
        else
            newIndex = index - 1;
    }
    else
        throw( SyntaxError(`Incorrect change type of ${changeType} specified. Please choose either 'inc' or 'dec'. `) );
    

    return newIndex;
}

export default changeArrayIndex;