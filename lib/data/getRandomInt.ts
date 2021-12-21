/**
 * Returns a random integer ( whole number ) between 0 and ( int - 1 )
 */
const getRandomInt = (
    int: number,
) => {
    return Math.floor( Math.random() * int );
}

export default getRandomInt;