export default {};

class FooError extends Error {
    constructor(m: string) {
        super(m);
    }
    sayHello() {
        return "hello " + this.message;
    }
}

try {
    throw new FooError('example');
} catch (error) {
    console.log(error instanceof FooError); // Returns false!
    // console.log(error.sayHello()); // Error, it's undefined.
}

class GoodError extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FooError.prototype);
    }
    sayHello() {
        return "hello " + this.message;
    }
}

try {
    throw new GoodError('example');
} catch (error) {
    // Unfortunately still returns false...
    // ...except if we switch target to ES2015.
    console.log(error instanceof GoodError);

    // But at least our method is working!
    console.log(error.sayHello());
}

// But does not work on Internet Explorer 10 and earlier...
// https://msdn.microsoft.com/en-us/library/s4esdbwz(v=vs.94).aspx

// Same applies to other build-in types like Array and Map.

// TypeScript FAQ: https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
