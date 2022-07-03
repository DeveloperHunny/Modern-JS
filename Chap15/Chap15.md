## 15.1 var 키워드로 선언한 변수의 문제점
---
ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것.<br>
하지만 다음과 같은 문제점으로 인해 es6에 let, const로 대체됨 <br>

> 1. 변수 중복 선언 허용<br>

```javascript
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다.
var y;

console.log(x); // 100
console.log(y); // 1
```

> 2. 함수 레벨 스코프<br>  

```javascript
var i = 10;

// for문에서 선언한 i는 전역 변수이다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// 의도치 않게 i 변수의 값이 변경되었다.
console.log(i); // 5
```

> 3. 변수 호이스팅<br>

```javascript
// 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
// 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
console.log(foo); // undefined

// 변수에 값을 할당(3. 할당 단계)
foo = 123;

console.log(foo); // 123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;
```

## 15.2 let 키워드
---

위의 이러한 문제점들로 인해 ES6에선 let, const 키워드가 도입됨.<br>
var 키워드와 차이점을 중심으로 let 키워드를 살펴보자.

> 변수 중복 선언 금지

var 키워드로 동일한 변수를 중복 선언할 수 있다.<br>
하지만 이는 의도치 않은 오류를 발생시킬 수 있으므로 지양해야 한다.<br>
**let 키워드로 중복 선언을 하면 오류 발생** <br>

```javascript
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

>  블록 레벨 스코프

var 키워드로 선언한 변수는 오로지 함수 코드 블록만 지역 스코프로 본다.<br>
따라서 for / while / if / try&catch 문에서 사용된 var 키워드는 해당 지역 스코프로 보지 않으므로 의도치 않은 오류가 발생할 수 있으므로 삼가야 한다.<br>
**let 키워드는 블록 레벨 스코프이므로 해당 문제가 발생하지 않는다.**<br>

```javascript
let foo = 1; // 전역 변수

{
  let foo = 2; // 지역 변수
  let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

> 변수 호이스팅 발생 X

var 키워드랑 달리 let 키워드로 선언된 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.<br>

var 키워드는  런타임 이전 변수 선언과 동시에 undefined로 초기화가 되기때문에 선언문 이전에 변수 호출이 가능하다.

```javascript
// var 키워드로 선언한 변수는 런타임 이전에 선언 단계와 초기화 단계가 실행된다.
// 따라서 변수 선언문 이전에 변수를 참조할 수 있다.
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

<br>

반면에 let 키워드는 런타임 이전에 선언이 일어나긴 하지만 초기화는 런타임에 선언문에 도달해야지 발생한다. <br>
즉, 선언문 이전에 변수를 호출할 수가 없다.

```javascript
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2; // 지역 변수
}   
```

> javascript는 내부적으로는 var, let, const, function, class 등 모든 선언 키워드는 호이스팅이 발생한다.<br>
> 그러나 let, const 키워드는 호이스팅이 발생하지 않는 것처럼 동작할 뿐이다.<br>

## 15.2.4 전역 객체와 let
---

var 키워드로 선언한 전역 변수 & 전역 함수와 선언 키워드 없이 값을 할당한 변수는 전역 객체 window의 프로퍼티가 된다.<br>
그리고 window 프로퍼티는 참조할 때 window를 생략할 수 있다.

```javascript
// 이 예제는 브라우저 환경에서 실행해야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
```

<br>

그러나 let 키워드로 선언한 전역 변수는 window 객체의 프로퍼티가 아니다. <br>
즉, window.foo와 같이 접근할 수 없다.<br>
let 전역 변수는 보이지 않는 개념적인 블록에 존재하게 된다. (전역 렉시컬 환경)<br>

<br>

## 15.3 const 키워드
---
const 키워드는 상수를 선언하기 위해 사용됨. (하지만 반드시 상수만을 위해 사용되는 건 아님. 이는 후반부에 다룰 예정)

<br>

> const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화를 해야한다.

```javascript
const foo = 1;
```

<br>

> 블록 레벨 스코프 & 변수 호이스팅 X

```javascript
{
  // 변수 호이스팅이 발생하지 않는 것처럼 동작한다
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

<br>

> const 키워드는 재할당이 안 된다.

```javascript
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

<br>

## 15.3.3 상수
---
const 키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다.<br>
원시 값은 재할당 없이 값을 변경할 수 없기 때문이다.<br>

상수는 상태 유지와 가독성, 유지보수의 편의를 위해 적극적으로 사용해야 한다.
```javascript
// 세전 가격
let preTaxPrice = 100;

// 세후 가격
// 0.1의 의미를 명확히 알기 어렵기 때문에 가독성이 좋지 않다.
let afterTaxPrice = preTaxPrice + (preTaxPrice * 0.1);

console.log(afterTaxPrice); // 110
```

<br>

> 위의 코드에서 0.1 의미를 알기 힘들다. 0.1은 세율이며 고정된 값이므로 const를 사용해 가독성과 유지보수성을 좋게 할 수 있다.

<br>

```javascript
// 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
// 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
const TAX_RATE = 0.1;

// 세전 가격
let preTaxPrice = 100;

// 세후 가격
let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);

console.log(afterTaxPrice); // 110
```


<br>

## 15.3.4 const 키워드와 객체
---

cosnt 변수에 원시 값을 할당한 경우 값을 변경할 수 없다.<br>
const는 재할당이 불가능하고 원시 값은 값을 변경할 수 없는 값이기 때문이다.<br>

<br>

**그러나 const 변수에 객체를 할당한 경우 값을 변경할 수 있다.**<br>
const는 재할당이 불가능한 것이지 값 변경이 안 되는 것이 아니다.<br>

```javascript
const person = {
  name: 'Lee'
};

// 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}
```

## 15.4 var & let & const
---

**권장사항**
> 1. ES6를 사용하는 경우 var 키워드를 사용하지 않는다.<br>
> 2. 재할당이 필요한 경우에만 let 키워드 사용. 이때 스코프는 최대한 좁게!<br>
> 3. 재할당이 발생하지 않는 원시 값과 객체에는 const 키워드를 사용한다.<br>
> 4. 일단 const 키워드를 사용하고 추후에 재할당이 필요하면 let을 사용하자.<br>