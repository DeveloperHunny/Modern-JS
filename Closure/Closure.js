// ===== 기본 형식 ====== 

// function outer(){
//     let title = "THIS IS TITLE";
//     function inner(){ // 함수 안에 또 다른 함수 정의
//         console.log(title); // inner 함수에서 outer 변수 사용
//     }
//     inner(); 
// }
// outer(); 


// ===== 외부 함수 변수 소멸 X =====
// function outer(){
//     let value = [1,2,3];
//     return function(){ // inner 함수를 반환값으로 줌
//         console.log(value);
//     }
// }

// inner = outer();
// inner(); // inner 함수에서 그대로 외부 함수의 변수를 사용함.


// ===== inner 함수에서 사용하는 변수가 outer 함수의 변수와 같은 변수인가? =====
function outer(ref){
    let value = [1,2,3];
    ref = 6;
    return function(){ // inner 함수를 반환값으로 줌
        console.log(value);
    }
}
let ref = 5;
outer(ref);
console.log(ref);
inner = outer(ref);
console.log(ref);
inner(); // inner 함수에서 그대로 외부 함수의 변수를 사용함.