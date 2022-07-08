## 생성자 함수에 의한 객체 생성
---

객체 리터럴 생성 방식은 가장 일반적이고 간단한 객체 생성 방식이다.<br>
하지만 Javascript 그 외에도 생성자 함수를 사용하여 객체 생성 방식이 존재한다.<br>

<br>
<br>

## 17.1 Object 생성자 함수
---

new 키워드와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다.
이후에 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있다.

```javascript
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```

javascript는 이 외에도 String / Number / Boolean / Function / Array / Date 등 빌트인 생성자 함수를 제공한다.

<br>
<br>

## 17.2.1 객체 리터럴에 의한 객체 생성 방식의 문제점
---
객체 리터럴 방식은 직관적이고 간편하다. 하지만 리터럴 방식은 객체를 단 하나만 생성한다.<br>
후에 동일한 객체를 생성해야 할 때 똑같은 프로퍼티를 매번 기술해야 한다는 단점이 존재한다.<br>

```javascript
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle2.getDiameter()); // 20
```

<br>
<br>

## 17.2.2 생성자 함수에 의한 객체 생성 방식의 자점
---
생성자 함수에 의한 객체 생성 방식은 일종의 템플릿(클래스)처럼 구조를 정의할 수 있어 <br>
동일한 객체를 여러 개 간편하게 생성할 수 있다는 장점이 있다.

```javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```


<br>
<br>

## this 바인딩 방식
---

this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이다.<br>
이때 this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.<br>


| 함수 호출 방식 | this가 가리키는 값(this 바인딩) |
| --- | --- |
| 일반 함수로서 호출 | 전역 객체
| 메서드로서 호출 | 해당 메서드 호출한 객체 |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스 |

```javascript
// 함수는 다양한 방식으로 호출될 수 있다.
function foo() {
  console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
foo(); // window

// 메서드로서 호출
const obj = { foo }; // ES6 프로퍼티 축약 표현
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst
```

<br>

생성자 함수는 객체를 생성하는 함수이다.<br>
하지만 자바 / C / C++ 와 같은 클래스 기반 객체지향 언어와 달리 생성자 형식이 정해져 있는 것이 아니라 <br>
일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자를 통해 호출하면 해당 함수는 생성자 함수로 동작한다.<br>

> <주의> new 연산자 없이 호출하면 그냥 일반 함수로 동작한다.

```javascript
// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
// 즉, 일반 함수로서 호출된다.
const circle3 = Circle(15);

// 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로서 호출된 Circle내의 this는 전역 객체를 가리킨다.
console.log(radius); // 15
```

<br>
<br>

## 17.2.3 생성자 함수의 인스턴스 생성 과정
---
생성자 함수는 인스턴스 생성하기 위한 클래스로 동작하여 **인스턴스 생성**과 **생성된 인스턴스 초기화** 역할을 한다.
<br>

```javascript
// 생성자 함수
function Circle(radius) {
  // 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
```

위의 코드를 보면, this에 프로퍼티를 추가하고 필요에 따라 초기값을 할당하여 인스턴스를 초기화한다.<br>
반환하는 코드가 따로 없는데, JS엔진이 이를 암묵적 처리를 통해 생성하고 반환을 한다.<br>

<br>
<br>

## 인스턴스 생성과 this binding
---

> 1. 인스턴스 생성과 this binding

JS엔진에 의해 런타임 이전에 암묵적으로 빈 객체(인스턴스)가 생성되고 해당 인스턴스는 this에 바인딩이 된다.<br>
따라서 생성자 함수 내부의 this는 생성한 인스턴스를 가리키게 된다.
```javascript
function Circle(radius) {
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.
  console.log(this); // Circle {}

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

<br>

> 2. 인스턴스 초기화

그 이후, this에 바인딩되어 있는 인스턴스를 초기화시킨다.
이때 프로퍼티나 메서드가 추가되고 프로퍼티는 전달받은 초기값으로 초기화된다.
```javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
``` 

<br>

> 3. 인스턴스 반환

생성자 함수 내부의 모든 처리가 끝나고 완성된 인스턴스가 바인딩된 this가 반환이 된다.<br>
**객체를 가리키고 있는 참조 값을 반환시킨다는 의미이다.**
```javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1, getDiameter: ƒ}
```

<br>

**이때 return문을 써서 명시적으로 객체를 반환하면 위의 암묵적인 this 반환이 무시된다.**
```javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 암묵적으로 this를 반환한다.
  // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
  return {};
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다.
const circle = new Circle(1);
console.log(circle); // {}
```

<br>
<br>

## 17.2.4 내부 메서드 [[Call]] & [[Construct]]
---

함수 선언문 또는 함수 표현식으로 정의한 일반적인 함수도 생성자 함수로 호출할 수 있다.<br>
즉, new 연산자와 함께 호출하여 객체를 생성할 수 있다는 것을 의미한다.<br>

<br>

JS에서 함수는 객체로 취급되므로 프로퍼티와 메서드 모두 갖을 수 있다.<br>


```javascript
// 함수는 객체다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메서드를 소유할 수 있다.
foo.method = function () {
  console.log(this.prop);
};

foo.method(); // 10
```

<br>

다만 일반 객체와 달리 함수는 호출할 수 있다는 차이점이 있다.<br>
따라서 함수 객체는 일반 객체와 다른 내부 슬롯과 내부 메서드를 가지고 있다.<br> 
함수가 호출되면 [[Call]]이 호출되고 new로 호출되면 [[Construct]]가 호출된다.<br>

```javascript
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출된다.
new foo();
```
<br>

내부 메서드 [[Call]]를 갖는 함수 객체를 callable이라고 한다.<br>
그리고 내부 메서드 [[Construct]]를 갖는 함수 객체를 constructor,<br>
갖지 않는 함수 객체를 non-constructor라고 부른다.<br>

<br>

호출할 수 있는 모든 객체는 [[Call]] 내부 메서드를 갖는다. <br>
따라서 일반 객체는 해당 메서드가 없지만 모든 함수 객체는 해당 메서드를 갖는다.<br>

<br>

반면에 모든 함수 객체가 [[Construct]] 내부 메서드를 갖고 있지는 않다.<br>
즉, 호출은 할 수 있지만 생성은 불가능한 함수가 존재한다는 의미이다.<br>

<br>
<br>

## 17.2.5 constructor와 non-constructor의 구분
---
JS엔진은 함수 정의를 평가하여 함수를 constructor , non-constructor로 구분한다.

> * constructor : 함수 선언문, 함수 표현식, 클래스
> * non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

이때 ECMAScript 사양에 따라 말하는 메서드는 ES6의 메서드 축약 표현만을 의미한다.

```javascript
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
  x: function () {}
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo();   // -> foo {}
new bar();   // -> bar {}
new baz.x(); // -> x {}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만을 메서드로 인정한다.
const obj = {
  x() {}
};

new obj.x(); // TypeError: obj.x is not a constructor
```

<br>
<br>

## 17.2.6 new 연산자
---
일반 함수와 생성자 함수의 형식적인 차이는 없다.<br>
다만 new 연산자와 함께 호출되면 생성자 함수, 그러지 않으면 일반 함수로 사용될 뿐이다.<br>
이때 해당 함수에 [[Construct]]가 없는데 new 연산자를 사용하면 error가 발생한다.<br>

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

<span style="color:red"> <주의> new 연산자 없이 함수 객체를 호출하면 내부 this는 window 전역객체로 취급된다. </span>

<br>
<br>

## 17.2.7 new.target
---
생성자 함수와 일반 함수가 형식적인 차이가 없어 의도와 다르게 사용될 위험이 존재한다.<br>
이러한 위험성을 회피하기 위해 ES6에선 new.target을 지원한다.<br>

<br>

new.target은 this와 유사하게 constructor 모든 함수 내부에서 암묵적인 지역 변수로 사용된다.<br>
new.target은 해당 함수가 생성자 함수로서 호출되면 함수 자신을 가리킨다. 그렇지 않으면 undefined를 반환한다.<br>
따라서 new.target을 이용하여 생성자 함수가 new 연산자 없이 일반 함수처럼 호출이 되더라도 오류가 발생하지 않도록 막을 수 있다.

```javascript
// 생성자 함수
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined다.
  if (!new.target) {
    // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter());
```

