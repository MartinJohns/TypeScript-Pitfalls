export default {};

class Animal {
    name: string = '';
}

class Dog extends Animal {
    bark(): void { console.log("Woof!"); }
}

class Cat extends Animal {
    meow(): void { console.log("Meow.."); }
}

// Create an array containing only dogs.
const dogs: Dog[] = [new Dog(), new Dog()];

// Implicitly assignable to animal array.
const animals: Animal[] = dogs;

// And it's possible to mutate the array:
animals.push(new Cat());

// But as arrays are references, we now have a cat in our dogs array.
// Assuming our Dog-array only contains dogs will fail.
dogs.forEach(dog => dog.bark());
