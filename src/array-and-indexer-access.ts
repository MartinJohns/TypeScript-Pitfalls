export default {};

const numbers: number[] = [1, 2, 3];

// Accessing an index of an array results in the type:
const n1 = numbers[0]; // Type: number

// But, accessing out of bounds results the same type, even tho it's undefined:
const n2 = numbers[999]; // Actually undefined!

// Possible alternative:
// Be explicit with your type, include the undefined possibility:
const numbers2: (number | undefined)[] = [1, 2, 3];

// Now accessing out-of-bounds results in the correct type:
const n3 = numbers2[999];

// But.. accessing **any** index includes undefined:
const n4 = numbers2[0];

// To use it we need to narrow it:
if (n4 !== undefined) {
    n4; // Type: number
}

// The choice is yours, the default is without-undefined...
// ..except since TypeScript 4.1, which introduced a compiler flat: "noUncheckedIndexedAccess"
// This causes **all** array access to include undefined, without being explicit.
const n5 = numbers[1];


// The same issue applies to indexer-types:
interface StringMap { [key: string]: string };
const values: StringMap = { a: 'a' };
const value: string = values['b'];
// The type is string, but it's actually undefined!

// Workaround here as well: Be explicit.
interface StringMap2 { [key: string]: string | undefined };
const values2: StringMap2 = { a: 'a' };
const value2 = values2['b']; // Type is string | undefined
