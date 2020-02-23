export default {};

// TypeScript documentation: https://www.typescriptlang.org/docs/handbook/basic-types.html#void
// `void` is a little like the opposite of `any`: the absence of having any type at all.

// `void` is often misunderstood as "no value", because that's how it usually is used in other languages.
// But in TypeScript `void` does not mean "no value", it means "no type information available".
// This is a small distinction to "any", which is the type information "can be anything".

// Instead `void` should be understood as: "Don't look at this value."

// Due to this dinstinction TypeScript is able to allow passing non-void returning functions
// as an argument to functions returning void.

function returnSomething() { return 'hello'; }
function doStuff(callback: () => void) {}

// Works fine!
doStuff(returnSomething);


// But a confusion often comes from trying to represent "my object or nothing":
interface Data { nested: { value: string } }

function returnData(): Data { return { nested: { value: 'secret data' } }; }
function returnVoid(): void {}

// When in JavaScript a function doesn't return a value, it implicitly returns undefined.
// So it's easy to assume we can distinguish our Data and void based on this,
// For example to allow passing a callback that either returns nothing, or returns our data.
function doMoreStuff(callback: () => void): void;
function doMoreStuff(callback: () => Data): void;
function doMoreStuff(callback: () => void | Data): void {
    const result = callback();
    if (typeof result === 'undefined') {
        console.log('We got undefined!');
    } else {
        // It's not undefined, so it should be Data, right?
        result; // TypeScript even tells us it's Data!

        console.log('Data is:', result.nested.value);
    }
}

// Seems to work, right?
doMoreStuff(returnData);
doMoreStuff(returnVoid);

// But thinking back, TypeScript allows to pass non-void returning functions to void returning functions.
function returnString(): string { return 'example'; }

// Used overload: Function returnung void.
// But the returned value is neither undefined, nor Data, so implemented check fails.
// doMoreStuff(returnString);

// The function could also return something like Data, but with incompatible types:
function returnRelated() { return { nested: { value: 200 } } } // value is a number, not string.
doMoreStuff(returnRelated);

// So remember: void does not mean nothing or undefined.
//              void means "DON'T LOOK AT THIS VALUE".
//
//              Avoid union types including void.
//              The example type above would mean "it's either Data, or DON'T LOOK AT THIS VALUE".
//              It can't be used safely.
//
//              If you want "nothing", be explicit: Use undefined or null.
