export default {};

// Writing a simple type-guard...
function isBoolean(value: unknown): value is boolean {
    return value === 'boolean';
}

const myBool = true;
if (isBoolean(myBool)) {
    console.log("Is a boolean");
} else {
    console.log("Is never, shouldn't happen.");

    // ...but it does!
}


// Implementation of custom type-guard is not verified by the compiler!
function isBooleanCorrect(value: unknown): value is boolean {
    // We forgot the typeof operator:
    return typeof value === 'boolean';
} 

if (isBooleanCorrect(myBool)) {
    console.log("Is a boolean");
} else {
    console.log("Is never, shouldn't happen.");

    // ...but it does!
}
