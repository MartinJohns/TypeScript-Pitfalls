export default {};

// Case: Unsafe `Partial<T>` to `T` object spread
interface Options {
    readonly hostname: string;
    readonly port: number;
    readonly schema?: string;
}

const defaultOptions: Options = { hostname: "localhost", port: 80, schema: "http" };

// Allow user to override default options using Partial<Options>
function getFinalOptions(optionsOverride: Partial<Options>): Options {
    // Create a new "full" options object based on default options and the overrides
    const finalOptions: Options = {
        ...defaultOptions,
        ...optionsOverride
    };

    return finalOptions;
}

// Seems to be working fine at first:
const optionsTest1: Options = getFinalOptions({ port: 8080 });
console.log(optionsTest1);

// Unless we **explicitly** assign `undefined` to a property:
const optionsTest2: Options = getFinalOptions({ port: undefined });
console.log(optionsTest2); // port is now undefined...
optionsTest2.port;         // ... but the type is still `number`, not `number | undefined`!

// Value could also come from a complex method...
function getPort(): number | undefined { return Math.random() > 0.5 ? 1337 /* configured port */ : undefined;  }
const optionsTest3: Options = getFinalOptions({ port: getPort() });
console.log(optionsTest3);


// Why?
// Partial<T> makes every property of T optional,
// that each properties type is a union type with `undefined`.
// As a result we can omit those properties, but we can also explicitly assign `undefined`.
// There's currently no way to distinguish "missing" properties and `undefined` ones.
// TODO: Insert issue regarding "missing" here.


// Alternative:
// Use Pick<> to only allow override providing specific properties,
// but keep the correct type (no `undefined` union).
function getFinalOptionsBetter<K extends keyof Options>(optionsOverride: Pick<Options, K>): Options {
    return { ...defaultOptions, ...optionsOverride };
}

// Override still works:
const optionsTest4: Options = getFinalOptionsBetter({ port: 9616 });

// But passing `undefined` does not compile anymore:
// const optionsTest5: Options = getFinalOptionsBetter({ port: undefined });

// Drawback: Using a function that optionally returns a value does not work anymore either:
// const optionsTest6: Options = getFinalOptionsBetter({ port: getPort() });

// Additional drawback: You can still pass struturally comaptible types that may contain bad runtime values:
const newOptions = { hostname: "example.com", port: undefined } as { hostname: string }; // Typed without port, but has port property.
const optionsTest7: Options = getFinalOptionsBetter(newOptions);
console.log(optionsTest7);


// Safest way requires active developer awareness:
function getFinalOptionsSafe(optionsOverride: Partial<Options>): Options {
    // First create a copy of the override (so we don't mutate the object):
    const optionsOverrideCopy: Partial<Options> = { ...optionsOverride };

    // Next delete all `undefined` properties:
    for (const key of Object.keys(optionsOverrideCopy)) {
        // Object.keys() returns `string`, not `keyof Options`.
        const typedKey = key as keyof Options;
        if (optionsOverrideCopy[typedKey] === undefined) {
            delete optionsOverrideCopy[typedKey];
        }
    }

    // Now create the final object with the sanitized overrides:
    return { ...defaultOptions, ...optionsOverrideCopy };
}

// Drawback: You can't override properties explicitly with undefined. Use null for that case.
const optionsTest8: Options = getFinalOptionsSafe({ schema: undefined });
console.log(optionsTest8);
