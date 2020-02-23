export default {};


// An indexer-type with "known properties":
interface ServerOptions {
    // Some known properties:
    hostname: string;
    port: number;

    // The indexer return-type must be a union of all types:
    [key: string]: string | number;
}

const options: ServerOptions = {
    hostname: 'localhost',
    port: 80
}

// Using the property name as a literal results in the right type: string
const val1 = options['hostname']

// But using providing the property name as a string means TypeScript can't infer the correct type.
// The indexer return-type is used.
const key2: string = 'port';
const val2 = options[key2]; // Type: string | number

// Not per-se bad, but the other way around is.
// options['hostname'] = 123; // Fails correctly, the property name is provided as a literal.

// But again, using a string-key we can assign types using the union type.
const key3: string = 'some-key';
options[key3] = 'test';

// And this causes issues when you assign a known property using a string-key:
const key4: string = 'port';
options[key4] = 'not-a-number'; // No compilation errors.

const port = options.port; // Type is number
console.log(typeof port) // But runtime type is string!


// The structurally typed nature of TypeScript causes issues as well.
function getObject(): { key: string } {
    const obj = { key: 'bla', additional: true };

    // The object has two properties, but the return type only one.
    // Because the types are structureally compatible it's possible to return it.
    return obj;
}

// Here TypeScript only knows about the defined properties: key
// It's unaware of the additional property.
const obj = getObject();

// The type "{ key: string }" is compatible with an indexer only returning strings:
interface StringMap { [key: string]: string }
const strings: StringMap = obj;

// But accessing the "hidden" property can result in unexpected behavior:
const additional: string = strings['additional'];
console.log(typeof additional); // The type is string, but it's actually a boolean!
