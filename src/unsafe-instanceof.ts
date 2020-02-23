// Case: unsafe `instanceof`
class User {
    public readonly userName: string;

    public constructor(userName: string) {
        this.userName = userName;
    }
}

const user: User = { userName: 'Martin' };
if (user instanceof User) {
    console.log("This is a user!");
} else {
    user; // Type is `never`, according to TypeScript we should never have this case.
    console.log("This is not a user?!");
}


// Why?
// Classes without private or protected members are structurally typed.
// As a result you can assign object literals that are structurally compatible.
// But the "instanceof" operator of JavaScript is checking for the prototype chain,
// which is not present in object literals.

// Instaed use classes with at least one private or protected member is nominally typed.
class SafeUser {
    private readonly dummy!: never; // Just a fake private property.
    public readonly userName: string;

    public constructor(userName: string) {
        this.userName = userName;
    }
}

// Not compiling anymore:
// const safeUser: SafeUser = { userName: 'Martin' };
