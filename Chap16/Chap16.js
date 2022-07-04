const Person = {
    first_name : "Dongo",
    last_name : "KIM",

    get fullName(){
        return `${this.last_name} ${this.first_name}`;
    },

    set fullName(name){
        [this.first_name, this.last_name] = name.split(' ');
    }
}


console.log(Person.fullName);

Person.fullName = 'DeeHun Go'
console.log(Person.fullName);