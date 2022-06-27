## 12.1 함수란?
---
```javascript
// f(x, y) = x + y
function add(x, y) {
  return x + y;
}

// f(2, 5) = 7
add(2, 5); // 7
```

함수는 일련의 과정을 statement로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것.

## 12.2 함수를 사용하는 이유
---
동일한 작업을 반복적으로 수행해야 할 때, 같은 코드를 중복해서 작성할 필요 없음. 

> * 재사용성 증가 <br>
> * 유지보수 편의성 증가 <br>
> * 신뢰성 증가 <br>
> * 가독성 증가

## 12.3 함수 리터럴
---
객체를 리터럴로 생성하는 것처럼 함수도 함수 리터럴로 생성이 가능하다. 

```javascript
// 변수에 함수 리터럴을 할당
var f = function add(x, y) {
  return x + y;
};
```

**함수 리터럴의 구성요소**
> * 함수 이름<br>
> * 매개변수 목록<br>
> * 함수 몸체<br>

함수는 객체로 평가된다. 그러나 일반 객체와는 다르다.<br>
**일반 객체는 호출할 수 없지만 함수는 호출할 수 있다.**

## 12.4 함수 정의
---

함수를 정의하는 4가지 방식

| 함수 정의 방식 | 예시 |
|-----|--------|
|함수 선언문|function add (x,y) { return x+y; }|
|함수 표현식|var add = function(x,y){ return x+y; }|
|Function  생성자 함수|var add = new Function('x', 'y', 'return x+y');|
|화살표 함수(ES6)| var add = (x,y) => x+y; |

위의 모든 방식은 함수를 정의한다는 면에서는 동일하다.<br>
**하지만 각 정의 방식은 미묘하지만 중요한 차이점이 존재한다.**

## 12.4.1 함수 선언문
---
```javascript
// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 참조
// console.dir은 console.log와는 달리 함수 객체의 프로퍼티까지 출력한다.
// 단, Node.js 환경에서는 console.log와 같은 결과가 출력된다.
console.dir(add); // ƒ add(x, y)

// 함수 호출
console.log(add(2, 5)); // 7
```

함수 선언문은 함수 리터럴과 형태가 동일하다.<br>
단, 함수 리터럴은 함수 이름을 생략할 수 있지만 **함수 선언문은 함수 이름을 생략할 수 없다.**

```javascript
// 함수 선언문은 함수 이름을 생략할 수 없다.
function (x, y) {
  return x + y;
}
// SyntaxError: Function statements require a function name
``` 

함수 선언문은 표현식이 아닌 statement(문)이다.
따라서 함수 선언문을 실행하면 완료 값이 출력되는 것이 아닌 undefined이 출력되고 변수에 할당할 수 없다.

그러나 아래 코드를 보면 변수에 할당하는 것처럼 보인다.
```javascript
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
// 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.
var add = function add(x, y) {
  return x + y;
};

// 함수 호출
console.log(add(2, 5)); // 7
```

> 이는 JS엔진이 코드 문맥에 따라 알맞게 해석하여 처리하기 때문이다.
> 함수 선언문이 피연산자로 있을 경우 이는 함수 리터럴로도 볼 수 있기때문에 리터럴로 처리한다고 생각하면 된다.

```javascript
// 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
// 함수 선언문에서는 함수 이름을 생략할 수 없다.
function foo() { console.log('foo'); }
foo(); // foo

// 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
// 함수 리터럴에서는 함수 이름을 생략할 수 있다.
(function bar() { console.log('bar'); });
bar(); // ReferenceError: bar is not defined
```

함수 선언문을 통해 생성된 foo는 호출이 가능하다. <br>
하지만 밑에 있는 함수 리터럴로 생성된 foo는 호출이 불가능하다. -> 가리키는 식별자가 존재하지 않는다.

> "함수이름은 함수 몸체 내에서만 참조할 수 있는 식별자다" <br>
> 따라서 함수 몸체 외부에서는 함수를 가리키는 식별자가 없는 한 호출할 수 없게 된다.

```javascript
var add = function add(x,y){ return x+y; };
console.log(add(2,5));
```

사실 위의 코드에서 호출된 'add'는 함수 이름이 아닌 변수 add이다.<br>
변수 add가 함수 add를 가리키고 있기 때문에 호출이 가능한 것이다.<br>


>**함수 선언문은 그러면 어떻게 호출이 가능한걸까?**<br>
함수 선언문도 사실 리터럴과 동일한 구조로 동작하기 때문에 본래라면 가리키는 식별자가 없는 한 호출이 불가능하다.<br>
하지만 JS 엔진에서 함수 선언문은 암묵적으로 동일한 이름의 식별자를 만들어 우리는 이를 통해 호출할 수 있던 것이다.

## 12.4.2 함수 표현식
---

**자바스크립트의 함수는 '일급 객체'이다.** <br>
즉, 값처럼 취급되어지는 객체이므로 값처럼 자유롭게 사용할 수 있다.<br>

함수를 값처럼 다룰 수 있기 때문에 변수에 할당할 수 있다.<br>
그리고 이러한 함수 정의 방식을 "함수 표현식"이라 한다.
```javascript
// 함수 표현식
var add = function (x, y) {
  return x + y;
};

console.log(add(2, 5)); // 7
```

이때 함수 표현식은 함수 이름을 생략할 수 있다. 이를 '익명 함수'라고 한다.

## 12.4.3 함수 생성 시점과 함수 호이스팅
---

```javascript
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```

>함수 선언문으로 정의한 함수는 선언문 이전에 호출 가능.<br>
그러나 함수 표현식으로 정의한 함수는 선언문 이전에 호출 불가능.

**이는 함수 생성 시점이 다르기 때문이다.**
코드가 한 줄씩 실행되는 시점인 런타임(runtime) 이전에 생성되느냐 안 되는냐의 차이이다.<br>
런타임 이전에 JS 엔진에 의해 먼저 전체 코드가 실행된다. 이때 함수 선언문은 함수 객체를 생성하고 동일한 이름의 식별자를 생성한다.<br>
그러나 함수 표현식은 이러한 동작을 거치지 않고 바로 런타임으로 넘어가게 된다.<br>
따라서 함수 선언문은 선언문 이전에 함수를 호출할 수 있다.<br>

<span style="color:red">이와 같이 함수 선언문이 선두로 끌어 올려진 것처럼 동작하는 것을 함수 호이스팅(hoisting)이라고 한다.</span>

이때, 함수 호이스팅과 변수 호이스팅이 다르게 동작하는 것을 주의해야 한다.<br>
함수 호이스팅은 런타임 이전에 객체 생성 및 할당까지 완벽히 마친 상태라서 선언문 이전에 함수를 호출해도 아무런 문제가 발생하지 않는다.<br>
반면에 변수 호이스팅은 런타임 이전에 생성이 이루어지기 하지만 undefined로 초기화된다. 따라서 선언문 이전에 변수를 참조를 할 수 있지만 기대한 값이 나오리란 보장이 없다.(undefined로 초기화되었기 때문)

> 이러한 변수 호이스팅과 함수 호이스팅 차이로 함수 표현식은 함수 선언문과 다른 결과를 보여주게 된다. <br>
> 변수에 함수 객체가 할당이 되는 형태인 함수 표현식은 런타임 이전엔 undefined로 초기화되기 때문에 선언문 이전에 호출이 불가능하다.
> 따라서 함수 표현식에서 함수 호이스팅 방식을 적용하면 undefined를 호출하는 것과 같기 때문에 타입 에러가 발생한다.

## 12.4.4 Function 생성자 함수
---
Function 생성자 함수를 통해 함수를 생성
```javascript
var add = new Function('x', 'y', 'return x + y');

console.log(add(2, 5)); // 7
```
하지만 이러한 방식은 일반적이지 않으며 권장되지 않는다.
이 방식은 클로저(closure)를 생성하지 않는 등, 일반적인 함수 생성 방식과 다르게 동작한다.

## 12.4.5 화살표 함수
---
ES6에서 도입된 방식으로 '=>' 키워드를 통해 함수를 생성한다. 이때 항상 익명함수로 정의한다.
```javascript
// 화살표 함수
const add = (x, y) => x + y;
console.log(add(2, 5)); // 7
```
화살표 함수는 기존의 함수 방식을 간략하게 표현하기 위해 디자인된 방법이다. <br>
생성 방식도 간략화되어있다. 여러가지 보통 함수 생성 방식과 차이점을 보인다.
> * 생성자 함수로 사용할 수 없다.
> * this binding 방식이 다르다.
> * prototype 프로퍼티가 없다. 
> * arguments 객체를 생성하지 않는다.

**자세한 내용은 26.3절에서 다룰 예정**

## 12.5 함수 호출
---
함수는 함수를 가리키는 식별자 + 한 쌍의 소괄호(0개 이상의 인수)로 호출한다. <br>
이때 이 소괄호를 함수 호출 연산자라고 한다. 


## 12.5.1 매개변수와 인수
---
매개변수는 함수를 정의할 때 선언하며, 함수 body에서 변수와 동일하게 취급.<br>
즉, 함수가 호출되면 암묵적으로 매개변수 생성 -> 일반 변수와 똑같이 undefined로 초기화된 후 이후 인수가 순서대로 할당됨.<br>

**매개변수는 함수 body 내에서만 유효하다. 즉, 매개변수의 스코프는 함수 내부이다.**

```javascript
function add(x, y) {
  console.log(x, y); // 2 5
  return x + y;
}

add(2, 5);

// add 함수의 매개변수 x, y는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined
```


>함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다.

즉, 함수를 호출할 때 둘을 일치시키는 것이 일반적이지만 그렇지 않은 경우에도 에러가 발생하지 않음.<br>
**인수가 부족해서 인수가 할당되지 않은 매개변수 값은 일반 변수가 그러하듯 undefined이다**
```javascript
function add(x, y) {
  return x + y;
}

console.log(add(2)); // NaN
```

위에서 add(2)는 2 + undefined이므로 NaN이 반환된다. <br>

<br>

매개변수보다 인수가 더 많은 경우 초과된 인수는 무시된다. (정상적으로 작동함.)<br>
사실 그냥 버려지는 것이 아닌 암묵적으로 객체의 arguments 프로퍼티로 보관됨.
```javascript
function add(x, y) {
  console.log(arguments);
  // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]

  return x + y;
}

add(2, 5, 10);
```

arguments 객체는 함수의 매개변수 개수를 확정할 수 없을 때 유용하게 사용됨. 추후에 자세히 알아보자.


## 12.5.2 인수 확인

자바스크립트는 어떤 타입의 인수를 전달해야 하는지, 어떤 타입의 값을 반환하는지 명확하지 않다. <br>
이로 인해 여러 문제점이 발생할 수 있다.
```javascript
function add(x, y) {
  return x + y;
}

console.log(add(2));        // NaN
console.log(add('a', 'b')); // 'ab'
```

위 코드는 자바스크립트 문법상 어떠한 문제도 없으므로 JS 엔진은 어떠한 오류도 발생시키지 않는다.<br>
이는 자바스크립트의 다음과 같은 특징때문이다.

> 1. 자바스크립트는 매개변수와 인수의 개수 불일치 여부 확인 X
> 2. 자바스크립트는 동적 타입 언어이므로 사전에 매개변수나 반환 타입을 지정할 수 없다.

따라서 자바스크립트는 함수를 정의할 때 적절한 인수가 전달되었는지 확인할 필요가 있다.

```javascript
function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    // 매개변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다.
    throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
  }

  return x + y;
}

console.log(add(2));        // TypeError: 인수는 모두 숫자 값이어야 합니다.
console.log(add('a', 'b')); // TypeError: 인수는 모두 숫자 값이어야 합니다.
```

이처럼 함수 내부에서 적절한 인수가 전달되었는지 확인할 수 있다.<br>
하지만 이렇게 하더라도 결국 에러는 런타임에 발생한다.<br>
**이를 컴파일 단계때 확인하려면 "타입스크립트"와 같은 정적 타입 선언 가능한 언어를 확장해 사용해야 한다.**

## 12.5.3 매개변수의 최대 개수
---

ECMAScript 사양에서 매개변수의 최대 개수에 대해 명시적으로 제한하고 있지 않음.<br>
따라서 충분히 많은 양의 매개변수를 지정할 수 있다.<br><br>

하지만 매개변수를 많이 사용하면 이해하기도 힘들고 유지보수성이 나빠진다.<br>
**따라서 되도록 적은 개수의 매개변수를 이용하는 게 바람직하다.**<br>
**이상적인 함수는 한 가지 일만 해야 하며 가급적 작게 만들어야 한다.**

## 12.5.4 반환문
---

**반환문의 역할**
> 1. 함수를 종료시키고 빠져나온다.
> 2. return 키워드 뒤에 오는 표현식을 평가해 반환한다. -> 지정하지 않으면 undefined

```javascript
function foo () {
  return;
}
console.log(foo()); // undefined
```
```javascript
function foo () {
  // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
}
console.log(foo()); // undefined
```

## 12.6 참조에 의한 전달과 외부 상태의 변경
---

매개변수도 함수 내부에서 변수와 동일하게 취급되므로 타입에 따라 Pass By Value , Pass By Reference로 전달된다.
```javascript
// 매개변수 primitive는 원시값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달된다.
changeVal(num, person);

// 원시값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

ChangeVal 함수는 전달받은 인수의 값을 변경하는 함수이다.<br>
이때 원시 타입은 변경 불가능한 값이므로 새로운 원시 값을 생성해서 할당을 하므로 원본이 훼손되지 않는다.<br>
반면에 객체 타입은 변경 가능한 값이므로 새로운 객체 할당 없이 참조 값을 통해 직접 객체를 변경하여 원본이 훼손된다.<br>

**이처럼 함수가 외부 상태를 변경하면 상태 변화를 추적하기 어려워져서 지양해야 한다.**

>이를 막기 위해선 객체를 불변 객체로 만들어 상태 변경을 원천 봉쇄하는 방법이 있다.

변경이 필요한 경우에는 원본 객체를 깊은 복사(deep copy)를 통해 아예 새로운 객체로 변수에 재할당을 한다.<br>

**외부 상태를 변경하지 않고 외부 상태에 의존하지 않는 함수를 "순수 함수"라고 한다.**<br>
순수 함수를 통해 부수 효과를 최대한 억제하는 프로그래밍 패러다임이 **함수형 프로그래밍**이다.

## 12.7 다양한 함수의 형태
---

### 12.7.1 즉시 실행 함수
함수 정의와 동시에 즉시 호출되는 함수를 말한다.<br> 
단 한번만 호출되며 다시 호출 불가능.

```javascript
// 익명 즉시 실행 함수
(function () {
  var a = 3;
  var b = 5;
  return a * b;
}());
```

즉시 실행 함수는 이와 같이 익명으로 하는 게 일반적이다.

```javascript
// 기명 즉시 실행 함수
(function foo() {
  var a = 3;
  var b = 5;
  return a * b;
}());

foo(); // ReferenceError: foo is not defined
```

즉시 실행 함수에서도 함수 이름을 명시할 수 있긴 하다.<br> 
그러나 함수 이름을 명시해도 호출이 불가능한 것은 똑같다.

<br><br>

즉시 실행 함수는 반드시 ()괄호로 감싸야 한다. 그러지 않으면 에러가 발생한다.
```javascript
function () { // SyntaxError: Function statements require a function name
  // ...
}();
```
이는 함수 선언문으로 평가되는데 형식에 맞지 않기 때문이다. (함수 이름 명시해야 함)<br>
그리고 JS엔진에서 암묵적으로 {} 뒤에 세미콜론을 붙이기 때문에 ()가 에러 발생한다. (함수 이름을 명시해도 에러 발생)


## 12.7.2 재귀함수
---
함수가 자기 자신을 호출하는 함수를 의미한다.<br>
반복되는 처리에서 사용된다.

```javascript
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n
function factorial(n) {
  // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
  if (n <= 1) return 1;
  // 재귀 호출
  return n * factorial(n - 1);
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
console.log(factorial(4)); // 4! = 4 * 3 * 1 * 1 = 24
console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
```

재귀 함수 내부에서 사용되는 factorial는 함수를 가리키는 식별자가 아닌 함수 이름이다.<br>
함수 내부에선 함수 이름이 유용하므로 처음 사용되는 factorial 식별자과 그 다음에 사용되는 factorial 식별자는 다른 식별자이다.<br>

<br>
재귀 함수는 자신을 무한번 반복 호출한다. 따라서 탈출 조건을 반드시 만들어야 한다.

## 12.7.3 중첩함수
---
함수 내부에 정의된 함수를 중첩 함수 or 내부 함수라고 부른다.<br>
그리고 중첩 함수를 감싸고 있는 함수를 외부 함수라고 부른다.

```javascript
function outer() {
  var x = 1;

  // 중첩 함수
  function inner() {
    var y = 2;
    // 외부 함수의 변수를 참조할 수 있다.
    console.log(x + y); // 3
  }

  inner();
}

outer();
```

중첩 함수는 이와 같이 외부 함수의 변수를 참조할 수 있다.<br>
중첨 함수는 스코프와 클로저에 깊은 관련이 있다.<br>

## 12.7.4 콜백 함수
---

함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 "콜백 함수"라고 부르며 <br>
매개변수를 통해 콜백 함수를 전달받은 함수를 "고차 함수"라고 부른다. <br>

<br>

```javascript
// 외부에서 전달받은 f를 n만큼 반복 호출한다
function repeat(n, f) {
  for (var i = 0; i < n; i++) {
    f(i); // i를 전달하면서 f를 호출
  }
}

var logAll = function (i) {
  console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

var logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3
```

repeat 함수는 콜백 함수를 이용하여 구현하였다.<br>
이와 같이 구현하면 내부 로직에 강력하게 의존하지 않고 로직의 일부분을 함수로 전달받아 수행하므로 유연한 구조를 갖게 된다.<br>

<br>

이때 콜백 함수가 고차 함수 내부에서만 사용된다면, 익명 함수 리터럴로 정의하면서 바로 전달하는 것이 일반적이다.
```javascript
// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달한다.
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
repeat(5, function (i) {
  if (i % 2) console.log(i);
}); // 1 3
```
하지만 고차 함수가 호출될 때마다 콜백 함수는 매번 함수 객체를 생성하게 되므로 비효율적인 면이 있다. <br>
따라서 다른 곳에서 쓰임이 있다면 함수를 사전에 정의하는 것이 좋다. <br>

<br>

**콜백 함수는 비동기 처리 (이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용되는 매우 중요한 패턴이다.**
```javascript
// 콜백 함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백 함수를 실행한다.
document.getElementById('myButton').addEventListener('click', function () {
  console.log('button clicked!');
});

// 콜백 함수를 사용한 비동기 처리
// 1초 후에 메시지를 출력한다.
setTimeout(function () {
  console.log('1초 경과');
}, 1000);
```
<br>
<br>

**또한 콜백 함수는 배열 고차 함수에서도 사용이 된다.**
```javascript
// 콜백 함수를 사용하는 고차 함수 map
var res = [1, 2, 3].map(function (item) {
  return item * 2;
});

console.log(res); // [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1, 2, 3].filter(function (item) {
  return item % 2;
});

console.log(res); // [1, 3]

// 콜백 함수를 사용하는 고차 함수 reduce
res = [1, 2, 3].reduce(function (acc, cur) {
  return acc + cur;
}, 0);

console.log(res); // 6
```

## 12.7.5 순수 함수와 비순수 함수
---
어떤 외부 상태에 의존하지도 변경하지도 않는 함수를 순수 함수라고 부른다.<br>
그러지 않는 모든 함수를 비순수 함수라고 부른다.<br>

<br>

>* 외부 상태에 의존하지 않기 때문에 동일한 인수라면 언제나 같은 반환값을 보장한다.<br>
>* 외부를 변경하지 않기 때문에 인수의 불변성이 보장된다.

```javascript
var count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2
```

함수형 프로그래밍은 순수 함수와 보조 함수의 조합을 통해 외부 상태 변경을 최소화하여 불변성을 지향하는 프로그래밍 패러다임이다.<br>
자바스크립트는 멀티 패러다임 언어이므로 객체지향 뿐만 아니라 함수형 프로그래밍도 적극적으로 활용중이다.<br>



