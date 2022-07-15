// const circle = {
//     radius : 5,

//     getDiameter : function(){
//         return this.radius *2;
//     }
// }

// console.log(circle.getDiameter());

// function Circle(radius){
//     this.radius = radius;
// }

// Circle.prototype.getDiameter = function(){
//     return 2 * this.radius;
// }

// const circle = new Circle(5);
// console.log(circle.getDiameter());

// var value = 1;

// const obj = {
//     value : 100,
//     foo(){
//         console.log("foo this : ", this);

//         setTimeout(function(){
//             console.log("callback this : " , this);
//             console.log("callback this.value : ", this.value);
//         }, 100);
//     }
// }

// obj.foo();

const Person = {
    name : "LEE",

    foo(callback){
        setTimeout(callback.bind(this), 100);
    }
}

Person.foo(() => {
    console.log(`Hi My name is ${this.name}`);
});
