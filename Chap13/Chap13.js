// let x = 'global';
// function foo(){
//     var x = 'local';
//     console.log(x);
// }

// foo();
// console.log(x);

// 전역 스코프 영역

// function outer(){ //지역 스코프 영역
//     let outerVal = "outer"
//     function inner(){ // 하위 스코프 영역
//         console.log(outerVal);

//         let innerVal = "inner";
//         console.log(innerVal);
//     }
//     inner();
// }

// outer();

let x = 5;

function foo(){
    let x = 10;
    bar();
}

function bar(){
    console.log(x);
}

foo();
bar();