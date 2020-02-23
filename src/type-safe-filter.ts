export default {};

type TestFn = () => void;
const test: TestFn = (): void => { };

const values = [test, test, undefined, test];

values
    .filter(x => x !== undefined)
    // .forEach(x => x()); // Work around: ?.()


// Better: Custom type-guard.
function isNotUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}
