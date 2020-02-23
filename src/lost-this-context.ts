export default {};

class Example {
    name: string = 'Robert Paulson';

    simpleMethod() {
        console.log("Simple method was called.");
    }

    method() {
        console.log('His name is ' + this.name);
    }
}

function doStuff(callback: () => void) {
    // We just call the callback.
    callback();
}

const instance = new Example();

// The signature matches, our instance method is typed () => void,
// this works without an issue. 
doStuff(instance.simpleMethod);

// But passing along an instance method that accesses 'this' results in an error:
// TypeError: Cannot read property 'name' of undefined
// doStuff(instance.method);

// Due to how JavaScript works we lost the "this" context.
// Unfortunately TypeScript does not protect us from this case.


// Workaround 1: Wrap it in an arrow-function.
doStuff(() => instance.method());

// Workaround 2: Explicitly bind the this-context.
doStuff(instance.method.bind(instance));
