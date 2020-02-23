export default {};

// Read-only is often wrongly understood as immutable.
interface ReadOnlyData {
    readonly value: string;
}

const myData: ReadOnlyData = {
    value: 'Test'
};

// Fails, so.. immutable?
// myData.value = '?!';

// Mutable interface, matching the read-only interfaces properties.
interface MutableData {
    value: string;
}

// And a function that accepts the mutable interface and mutates the object.
function mutateData(data: MutableData): void {
    data.value = 'mutated';
}

// The read-only interface is **implicitly** compatible with the mutable version!
mutateData(myData);
console.log(myData.value); // Now mutated.

// Another issue:
const data: readonly number[] = [1, 2, 3];
if (Array.isArray(data)) {
    // Was 'fixed' in TypeScript 4.1, but change caused issues and will be reverted in 4.1.3.
    // https://github.com/microsoft/TypeScript/issues/41808
    // data.push(4);
}


// There is currently **no** way to represent immutable types in TypeScript!
