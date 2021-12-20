// NOTE - THIS TYPE ONLY WORKS IF THE PROP IS SPECIFIED BY THE USER WITHIN THE HTML
// IT WILL NOT WORK IF A DEFAULT PROP VALUE IS GIVEN FOR A COMPONENT
// WILL ALSO NOT ALLOW YOU TO DEFINE ANY NEW PROPS GIVEN THAT AN EXISTING PROP IS EQUAL TO A VALUE
// WHATEVER PROP IS EXTENDED MUST EXIST ON THE ORIGINAL PROPS TYPES ( 1: base prop types )

// THIS ALSO DOES NOT WORK IF THE PROP EXTENSION IS NOT AN EXTENSION TYPE OF ONE OF THE ORIGINAL PROPS
// FOR EXAMPLE - originalProp: boolean, extendedProp: true -> WORKS | originalProps: boolean, extendedProp: 'hello' -> WILL NOT WORK

// conditional props for React components
// extends base props with necessary additional props types
// speciifed as a generic with these 3 parameters
// 1: base prop types
// 2: prop key in string notation that will be extended - i.e 'style'
// 3: extended prop types that include the new altered key value pairs

// FOR MORE INFO:
// https://stackoverflow.com/questions/56437759/typescript-utility-type-for-conditional-props-based-on-entered-value-of-other-p


type RemoveCommonValues<T extends object, TOmit> = {
    [P in keyof T]: TOmit extends Record<P, infer U> ? Exclude<T[P], U> : T[P];
};
  
// not needed in 3.5
type Omit<T extends object, K extends PropertyKey> = Pick<T, Exclude<keyof T, K>>; 

// flattens out the types to make them more readable can be removed
type Id<T extends object> = {} & { 
    [P in keyof T]: T[P]; 
}; 

type ConditionalProps<T extends object, TKey extends keyof TCase, TCase extends Partial<T>> =
    Id<Omit<T, keyof TCase> & TCase> | 
    Id<RemoveCommonValues<T, Pick<TCase, TKey>>>;

export default ConditionalProps;