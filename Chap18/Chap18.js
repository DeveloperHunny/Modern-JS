const Person = {
    'name' : 'GODAEHUN',
    'age' : 20,
}

console.log(Object.getOwnPropertyDescriptors(Person));

const square = (number) => {
    console.log(arguments);
    return number * number;
}

console.log(square(5));