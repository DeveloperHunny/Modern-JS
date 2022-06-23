## 10.1 객체란?

  원시값을 제외한 나머지 값은 모두 객체이다.
  - 원시 값은 변경 불가능한 값
  - 객체는 변견 가능한 값
  - 객체는 프로터피로 구성된 집합이며, 프로퍼티는 키와 값으로 구성됨.
  - 프로퍼티가 함수일 경우, 메서드라고 부름.
  
<blockquote>
객체는 프로퍼티와 메서드로 구성된 집합체이다.
</blockquote>

## 10.2 객체 리터럴
---
객체를 생성하기 위한 표기법.
new 연산자와 함께 생성사를 호출할 필요가 없다.

```javascript
var person = {
  name: 'Lee',
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  }
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}
```

객체 리터럴은 값으로 평가되는 표현식이므로 중괄호 뒤에 세미콜론 붙여야 함.
<blockquote>
	{...} 를 통해 객체를 지정하는 방식을 객체 리터럴이라고 한다. <br>
  	이때 중괄호 안에 0개 이상의 프로퍼티를 정의할 수 있다.
</blockquote>

## 10.3 프로퍼티
---
객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성됨.

```javascript
var person = {
  // 프로퍼티 키는 name, 프로퍼티 값은 'Lee'
  name: 'Lee',
  // 프로퍼티 키는 age, 프로퍼티 값은 20
  age: 20
};
```
>
프로퍼티 나열할 때는 뒤에 쉼표를 사용. (마지막 프로퍼티는 사용하지 않아도 되나 구분을 위해 사용해도 됨)

<br>

프로퍼티 키는 값에 접근할 수 있는 이름이므로 식별자 역할을 한다.
이때 식별자 네이밍 규칙을 따르는 것과 따르지 않는 것의 미묘한 차이가 발생한다.

```javascript
var person = {
  firstName: 'Ung-mo', // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
  'last-name': 'Lee'   // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
};

console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}
```

>
식별자 네이밍 규칙을 따르면 따옴표를 생략할 수 있다.
그러나 식별자 네이밍 규칙을 따르지 않는다면 위의 예시와 같이 반드시 따옴표를 사용해야 한다.



```javascript
var obj = {};
var key = 'hello';

// ES5: 프로퍼티 키 동적 생성
obj[key] = 'world';
// ES6: 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
```

프로퍼티는 동적으로 생성이 가능하다. 
위의 예시와 같이 [ ]로 문자로 평가할 수 있는 표현식을 묶어서 사용한다.


## 10.4 메서드
---

자바 스크립트에서 함수는 "일급 객체"이다.
> <h3>일급객체란?</h3>
<li> 무영의 리터럴로 생성할 수 있다. 즉, 런타임에 생성 가능하다.</li>
<li> 변수나 자료구죠(객체,배열 등)에 저장할 수 있다.</li>
<li> 함수의 매개변수에 전달할 수 있다.</li>
<li> 힘수의 반환값으로 사용할 수 있다.</li>


따라서 함수는 값으로 취급할 수 있기 때문에 프로퍼티 "값"으로 사용이 가능하다.
```javascript
var circle = {
  radius: 5, // ← 프로퍼티

  // 원의 지름
  getDiameter: function () { // ← 메서드
    return 2 * this.radius; // this는 circle을 가리킨다.
  }
};

console.log(circle.getDiameter()); // 10
```

<strong> 메서드 내부에 사용한 this 키워드는 객체 자신을 카리키는 참조 변수이다. (22장에서 자세히 다룰 예정)</strong>

## 10.5 프로퍼티 접근
---

#### 프로퍼티에 접근하는 방법
>
* 마침표로 접근하는 방법
* 대괄호로 접근하는 방법

```javascript
var person = {
  name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee
```

<span style="color:red"> 이때 주의할 점은, 대괄호로 접근할 경우 반드시 따옴표로 감싼 문자열이어야 한다는 것이다.</span>
마침표로 접근할 경우는 해당 프로퍼티의 키로 바로 접근하면 되지만, 대괄호일 경우는 따옴표로 한번 감싸줘야 한다.

```javascript
var person = {
  name: 'Lee'
};

console.log(person[name]); // ReferenceError: name is not defined
```
이때 위와 같이 대괄호로 프로퍼티에 접근할 때 따옴표로 감싸지 않으면 "ReferenceError"가 발생한다.
#### 객체에 존재하지 않는 프로퍼티에 접근하면 undefined가 반환된다. 주의해야 한다!

```javascript
var person = {
  'last-name': 'Lee',
  1: 10
};

person.'last-name';  // -> SyntaxError: Unexpected string
person.last-name;    // -> 브라우저 환경: NaN
                     // -> Node.js 환경: ReferenceError: name is not defined
person[last-name];   // -> ReferenceError: last is not defined
person['last-name']; // -> Lee

// 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.
person.1;     // -> SyntaxError: Unexpected number
person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10 : person[1] -> person['1']
person['1'];  // -> 10
```

프로퍼티 키가 1,2,3....와 같은 숫자일 경우엔 대괄호 접근이라도 따옴표를 생략할 수 있다.

### Q. 위의 예제에서 person[last-name]을 JS엔진에서 실제로 어떻게 처리할까?
>
1. person.last를 먼저 평가한다. -> undefined 반환
2. name이라는 식별자를 찾는다.
3. undefined - name(변수)를 실행한다.

대괄호로 감싸지 않으면 위의 방식으로 JS 엔진에서 처리하게 된다.


## 10.6 프로퍼티 값 갱신
---
이미 존재하는 프로퍼티에 값은 할당하면 해당 값으로 갱신이 된다.
```javascript
var person = {
  name: 'Lee'
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = 'Kim';

console.log(person);  // {name: "Kim"}
```

## 10.7 프로퍼티 동적 생성
---
존재하지 않는 프로퍼티에 값을 할당하면 동적으로 프로퍼티가 생성되고 값이 할당된다.
```javascript
var person = {
  name: 'Lee'
};

// person 객체에는 age 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 20;

console.log(person); // {name: "Lee", age: 20}
```

## 10.8 프로퍼티 삭제
---
"delete" 연산자를 통해 프로퍼티를 삭제한다.
```javascript
var person = {
  name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

// person 객체에 age 프로퍼티가 존재한다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 있다.
delete person.age;

// person 객체에 address 프로퍼티가 존재하지 않는다.
// 따라서 delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;

console.log(person); // {name: "Lee"}
```

> 
이때 만약 존재하지 않는 프로퍼티를 삭제하면, 아무런 에러 없이 무시된다.

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능
---
ES6에서는 더욱 간편하고 직관적인 객체 리터럴 기능을 제공한다. 
>객체 생성 시 키와 값을 명시적으로 구분하지 않아도 됨

```javascript
// ES5
var x = 1, y = 2;

var obj = {
  x: x,
  y: y
};

console.log(obj); // {x: 1, y: 2}
```

위와 같이 프로퍼티의 값을 변수로 사용할 경우, 키와 값이 동일한 이름이면 생략할 수 있다.
```javascript
// ES6
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

### 10.9.2 계산된 프로퍼티 이름
프로퍼티 값을 문자열로 평가되는 계산식으로 사용할 수 있다.
>
prefix-(++i) => prefix-1, prefix-2, prefix-3 ... 와 같은 계산식을 키로 설정 가능.

```javascript
// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

### 10.9.3 메서드 축약 표현
ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당해야한다.
```javascript
// ES5
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

>ES6에선 메서드를 정의할 때 function 키워드를 생략하여 축약 표현을 사용할 수 있다.

```javascript
// ES6
const obj = {
  name: 'Lee',
  // 메서드 축약 표현
  sayHi() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

<span style="color:red">이때, ES6에서 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다른 방식으로 동작한다.
이에 대해서는 26.2절에서 자세히 설명하겠다.</span>