// === 함수 선언문 ===
// function add(x,y){
//     return x+y;
// }

// console.dir(add);
// console.log(add(2,5));


// === 함수 호이스팅 vs 변수 호이스팅 ===
// console.log(add1(1,2));

// console.log(add2);
// console.log(add2(1,2));

// var add2 = function(x,y){
//     return x+y;
// }

// function add1(x,y){
//     return x+y;
// }


// === 매개변수와 인수 개수의 불일치 ===
// var add = function(x,y){
//     return x+y;
// }

// console.log(add(2)); //y는 undefined이므로 NaN 반환
// console.log(add(2,3,4)); //초과된 인수는 그냥 무시됨. 따라서 정상적으로 2 + 3 = 5 가 나옴.


// === 콜백 함수 ===

// var repeat = (n,f) => {
//     for(var i = 1; i <= n; i++){
//         f(i);
//     }
// }

// function printAll(i){
//     console.log(i);
// }

// function printOdd(i){
//     if(i % 2 != 0) console.log(i);
// }
// console.log("print All");
// repeat(5,printAll);
// console.log("print Odd");
// repeat(5, printOdd);


let arr = [1,2,3,4,5];
let result = [];

result = arr.map((item) => item * 2);
console.log(result);

result = arr.filter((item) => item % 2);
console.log(result);

result = arr.reduce(function(acc,cur){ return acc + cur; });
console.log(result);