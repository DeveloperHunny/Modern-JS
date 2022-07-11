많은 사람들이 자바스크립트는 public, private, protected와 같은 캡슐화 키워드가 없어서 객체지향 언어가 아니라고 생각한다. <br>
하지만 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지닌 프로토타입 기반의 객체지향 프로그래밍 언어이다.

> 자바스크립트는 객체 기반의 언어이며 거의 모든 데이터들이 "객체"로 이루어져 있다.

<br>
<br>

## 19.1 객체지향 프로그래밍
---

객체지향 프로그래밍은 여러 개의 독립적 단위, 즉 객체 집합으로 프로그램을 표현하는 패러다임을 말한다.<br>

예를 들어, 사람은 이름, 주소, 성별, 나이 , 신장 ... 등과 같은 다양한 속성을 갖는다.<br>
그 중에서 관심있는 속성만 추려서 객체를 표현하는 것을 **추상화**라고 한다.<br>

```javascript
// 이름과 주소 속성을 갖는 객체
const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

<br>
이처럼 객체지향 프로그래밍은 객체를 상태 데이터와 동작을 하나의 논리적인 단위로 묶어 표현한다.

<br>
<br>

## 19.2 상속과 프로토타입
---

**상속**은 객체지향 프로그래밍의 핵심 개념으로 특정 객체의 정보를 상속받아 그대로 사용할 수 있는 것을 말한다.

<br>
코딩을 할 때 불필요한 중복을 제거하는 게 매우 중요하다.<br>
중복을 제거하는 효과적인 방법은 상속과 같은 방법을 이용해 기존의 코드를 적극적으로 활용하는 것이다.<br>

```javascript
const circle = {
  radius: 5, // 반지름

  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이: πrr
  getArea() {
    return Math.PI * this.radius ** 2;
  }
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter());  // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea());      // 78.53981633974483
```

<br>

위의 코드에서 Circle의 모든 인스턴스는 radius 프로퍼티와 getArea 메서드를 갖는다. <br>
이때, getArea 메서드는 모든 인스턴스마다 동일한 함수이므로 단 하나만 생성해서 인스턴스가 이를 공유해서 사용하는 것이 바람직하다. <br>
하지만 위와 같은 방법으로 생성자 함수를 정의하면 매번 getArea 메서드를 중복 생성하여 비효율적으로 동작한다.<br>

<br>

위와 같은 문제를 상속을 통해 불필요한 중복을 제거해보자.

**자바스크립트는 프로토타입을 기반으로 상속을 구현한다.**

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수다.
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

getArea 메서드는 단 하나만 생성되어 Circle.prototype의 메서드로 할당이 된다.<br>
자바스크립트에서 모든 인스턴스는 상위 객체역할을 하는 생성자 함수의 프로토타입의 모든 프로퍼티와 메서드를 상속받는다.<br>

<br>
<br>

## 19.3 프로토타입 객체
---

> 모든 객체는 하나의 프로토타입을 갖는다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다.

<br>

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없다.<br>
하지만 __proto__ 접근자 프로퍼티를 통해 자신의 [[Prototype]]이 가리키는 프로토타입에 간접적으로 접근이 가능하다.<br>
생성자 함수는 자신의 prototype 프로퍼티를 통해 접근이 가능하다.<br>

<br>
<br>

## 19.3.1 __proto__ 접근자 프로퍼티
---

**모든 객체는 __proto__를 통해 [[Prototype]] 내부 슬롯에 간접적 접근이 가능하다.

<img src="./Prototype.png" width = "400px">

위와 같이 Person 객체의 [[Prototype]]에 간접적으로 접근하면 [[Prototype]] 내부 슬롯이 참조하고 있는 Object.property를 볼 수 있다.

<br>
<br>

__proto__는 객체가 직접 소유하는 프로퍼티가 아니라 상위 객체의 Object.prototype의 프로퍼티이다.
```javascript
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

<br>

프로토타입은 체인 형태로 상위 프로토타입 프로퍼티로 연결이 된다.<br>
즉, 양방향으로 연결되어 서로가 서로의 프로토타입을 참조하는 무한 루프에 빠지느 경우가 생기지 않는다.<br>

> __proto__ 접근자 프로퍼티를 실제 개발에서 사용되는 것을 권장하지 않는다.<br>

<br>
<br>

## 19.3.2 함수 객체의 prototype 프로퍼티
---
함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // -> false
```

<br>
<br>

함수 객체에서 prototype은 인스턴스의 프로토타입을 가리키므로 생성자 함수로 호출할 수 없는 ES6의 화살표 함수와 메서드 축약 표현 함수는 prototype 프로퍼티를 소유하지 않는다. 

```javascript
// 화살표 함수는 non-constructor다.
const Person = name => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
  foo() {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

<br>
<br>

## 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수
---
모든 프로토타입은 constructor 프로퍼티를 갖는다.<br>
이 프로퍼티는  자신을 참조하고 있는 생성자 함수를 가리킨다.<br>
이 연결은 새로운 객체가 생성될 때 사용이 되어진다.

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person);  // true
```

<br>
<br>

## 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
---

리터럴 표기법에 의한 객체 생성 방식에는 명시적으로 생성자 함수를 호출하지 않는다.<br>
하지만 리터럴 표기법으로 생성된 객체에도 프로토타입이 물론 존재한다. <br>
하지만 해당 경우에는 프로토타입의 constructor가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.<br>

```javascript
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

> 프로토타입과 생성자 함수는 단독적으로 존재할 수 없고 항상 쌍으로 존재한다.

리터럴 표기법으로 생성된 객체는 생성자 함수에 의해 생성된 객체가 아니다.<br>
하지만 큰 틀에서 보면, 둘 다 같은 본질적인 면에서는 동일하다고 볼 수 있다.<br>

## 19.5 프로토타입의 생성 시점
---

위에서도 봤듯이 리터럴 표기법에 의해 생성된 객체도 생성자 함수와 연결되어 있다.<br>
JS에서 모든 객체느 생성자 함수와 연결되어 있다.<br>

<br>

**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.**

<br>
<br>

## 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.<br>

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

<br>
위에서 말했듯이 생성자 함수를 호출할 수 없는 non-constructor는 프로토타입이 생성되지 않는다.

```javascript
// 화살표 함수는 non-constructor다.
const Person = name => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

<br>
<br>

## 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점
---

Object, String, Number, Function 등과 같은 빌트인 생성자 함수도 마찬가지로 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.<br>
모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성이 되고 그 시점에 같이 프로토타입이 생성된다.

<br>
<br>

## 19.6 객체 생성 방식과 프로토타입의 결정
---

객체를 생성하는 방법은 다음과 같다.

- 객체 리터럴
- Object 생성 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

<br>

각 방식마다 세부적인 차이는 있겠지만 공통적으로 OrdinaryObjectCreate라는 추상 연산에 의해 생성된다.<br>
OrdinaryObjectCreate는 필수적으로 생성할 객체의 프로토타입을 인수로 전달받는다.<br>
즉, 이 시점에 어떤 인수가 전달되는지에 따라 프로토타입이 결정된다.<br>

<br>
<br>

## 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입
---