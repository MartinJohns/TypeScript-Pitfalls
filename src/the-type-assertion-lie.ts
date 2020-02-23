export default {};

// First of all: The syntax "<T>value" and "value as T" are absolutely the same. No difference.

// Type assertions are a way to tell the compiler:
// "Shushh, trust me, I know what I'm doing and you're wrong."
//
// It basically overrides the type-system.


// Type assertions are often mislabeled as "casts", and as a result users often have the misconception
// that type assertions behave like casts from other languages. But it's important to remember that
// type assertions have absolutely **no** runtime behavior. The type assertion is purely compile-time
// and part of the type-system.
const v1: unknown = 123;
const s1: string = v1 as string;
// console.log(s1.toLocaleLowerCase()); // Will result in an error.
// Despite the "as string", the value assigned to s1 is still v1: a number.
// And numbers don't have a toLocaleLowerCase() method.


// Type assertions are a good way to cause errors down-the-road.
interface Options { hostname: string; port: number; }

function getOptions(): Options {
    // The function returns "Options" having two properties: hostname and port.
    // But our object literal only contains one property: hostname
    // Normally this would not compile. But using type-assertions we can tell TypeScript to ignore the type-error,
    // and consider our object literal to be typed "Options". As a result the "port" properties type is "number",
    // but the value is actually "undefined".
    //
    // This can be used for cases where we know the object will be modified outside this function,
    // but TypeScript is unaware of this.
    return { hostname: 'localhost' } as Options;
}


// A common case is also to use type-assertions to avoid explicit type annotations and use the infered return type:
function getOptions2() { // No type annotation, use inferred type.
    // Returning the object literal. Because there is no explicit type used,
    // the inferred type will be: { hostname: string, port: number 
    // It is NOT "Options".
    return { hostname: 'localhost', port: 80 };
}

// Using a type-annotation we can help TypeScript to figure out the named type:
function getOptions3() {
    // Even tho we don't lie to compiler by ignoring missing properties
    // we use a type-assertion to help the compiler infer the return type as "Options".
    return { hostname: 'localhost', port: 80 } as Options;
}

// But the issue is.. what if we **extend** the interface Options?
// Due to the type assertion we don't get a compiler error about the missing properties anymore! Bad!

// A workaround, if you really want no return type annotation:
function getOptions4() {
    // Place the object literal in a typed variable first.
    const options: Options = { hostname: 'localhost', port: 80 };
    return options;
}


// In some cases the compiler performs a logic case to determine
// whether the type assertion makes sense in any case.
// Using typpe-assertions for arbitrary types is not directly possible.
// const s2: string = 51 as string; // Makes no sense, ever.
