export default {};

// The any-type is an "escape-hatch" from the type-system.
// It's basically.. JavaScript.

// Every type is assignable to any:
const str: any = 'abc';
const bool: any = true;
const number: any = 123;

const data = { value: 'abc' } as any;

// You can add, delete and access properties as you want.
data.name = 'Bob';
console.log(data.unknownProperty);
delete data.value;

// Problem: Any is implicitly assignable to any other type.
function printStringLength(str: string) {
    console.log(str.length);
}

// data is not a string, but it can be passed.
printStringLength(data);


// Entering the stage: unknown
// The type-safe alternative to any.

// Just like with any, every type is assignable:
const val1: unknown = 'abc';
const val2: unknown = 123;
const val3: unknown = true;
const data2: unknown = { value: 'abc' };

// But the important difference:
// unknown is NOT assignable to any other type (except any):
// printStringLength(val1);
// printStringLength(data2);

// Also, you can't access any properties.
// console.log(data2.value); // Error

// How to use the object then?
// Narrow the type with **explicit** checks:
if (typeof val1 === 'string') {
    // Type of val1 is now string, so it can be used.
    printStringLength(val1);
}
