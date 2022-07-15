## 22.1 this 키워드
---

객체는 메서드를 정의할 때 자신이 속한 객체의 상태(프로퍼티)를 참조하고 변경할 수 있어야 한다.<br>
**즉, 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.**<br>

<br>
<br>

```javascript
const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    // 이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드를 참조하려면
    // 자신이 속한 객체인 circle을 참조할 수 있어야 한다.
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

위와 같이 객체를 리터럴로 생성할 경우, 런타임 이전에 객체가 생성되므로 circle이라는 식별자에 객체가 담긴다.<br>
따라서 getDiameter 코드는 오류없이 동작한다.<br>
하지만 위와 같이 재귀적으로 자신이 속한 객체를 참조하는 방식은 바람직하지 않다.<br>

<br>
<br>

```javascript
function Circle(radius) {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  ????.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  return 2 * ????.radius;
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
const circle = new Circle(5);
```

위와 같이 생성자 함수를 통해 객체를 생성할 경우, 메서드에서 객체를 미리 특정할 수 없다.<br>
따라서 자신이 속한 객체 or 자신이 속할 객체를 가리키는 특수한 식별자가 필요하다.<br>
**이를 위해 JS에서 this라는 특수한 식별자를 제공한다.**

> this 자기 참조 변수이다. this를 통해 자신이 속한 객체를 참조할 수 있다.

<br>
<br>

Java나 C++ 같은 클래스 기반 언어에서는 this는 언제나 클래스가 생성하는 인스턴스를 가리킨다.<br>
하지만 JS의 this는 함수가 호출되는 방식에 따라 this에 바인딩되는 값이 다르다.<br>
**즉, this 바인딩이 동적으로 결정되므로 유의해서 사용해야 한다.**

```javascript
// this는 어디서든지 참조 가능하다.
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number;
}
square(2);

const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this); // {name: "Lee", getName: ƒ}
    return this.name;
  }
};
console.log(person.getName()); // Lee

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {name: "Lee"}
}

const me = new Person('Lee');
```

this 키워드는 일반적으로 객체 내부 또는 생성자 함수 내부에서만 의미가 있다.<br>
따라서 일반 함수 내부에서 사용되는 this는 전역 객체가 바인딩이 된다.<br>
strict mode에서는 undefined가 바인딩된다.<br>

<br>
<br>
<br>
<br>

## 22.2 함수 호출 방식과 this 바인딩
---

**this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.**

<br>

함수를 호출하는 방식은 다음과 같다.

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 소출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

<br>

```javascript
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
  console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출할 수 있다.

// 1. 일반 함수 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다.
foo(); // window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo(); // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: 'bar' };

foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar
```

> 즉, 같은 함수 객체라도 호출하는 방식에 따라 this에 바인딩 되는 값이 달라진다!

<br>
<br>
<br>

### 22.2.1 일반 함수 호출

<br>

기본적으로 일반 함수로 호출될 경우 this에는 window가 바인딩 된다.

* strict mode에서는 undefined가 바인딩된다.

```javascript
function foo() {
  console.log("foo's this: ", this);  // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

<br>
<br>

일반 함수 내부에 있는 중첩 함수이든 콜백 함수이든 상관없이 일반 함수로 호출되면 this에 전역 객체가 바인딩 된다.

```javascript
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this);  // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    bar();
  }
};

obj.foo();
```

<br>
<br>

하지만 위와 같이 함수에 전달된 콜백 함수가 일반 함수로 호출한다고 this가 전역객체가 되는 것은 문제가 있다.<br>
외부 메서드는 this는 해당 객체인데 내부에서 호출된 콜백 함수의 this는 전역 객체가 되면 다른 this를 가리키는 문제가 발생한다.<br>
따라서 이때는 아래와 같이 this 식별자를 담고 있는 새로운 변수를 할당해준다.

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();
```

<br>
<br>
<br>

### 22.2.2 메서드 호출

<br>

메서드 내부의 this는 메서드를 호출한 객체가 바인딩 된다.<br>

> 즉, 해당 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 this가 바인딩이 된다.

<br>

```javascript
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```
위의 코드에서는 person 내의 getName을 person 객체가 호출한다.<br>
따라서 this에는 person 객체가 할당되어 올바르게 Lee라는 결과값이 나온다.<br>

<br>
<br>

```javascript
const anotherPerson = {
  name: 'Kim'
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

이번에는 anotherPerson 객체에 해당 메서드를 할당해서 anotherPerson 객체로 호출했다.<br>
this에는 anotherPerson 객체가 바인딩이 되어 결과가 Kim이 나왔다.<br>
또한 그냥 일반 함수로 호출할 시 this에 전역객체가 바인딩이 된다.<br>

<br>
<br>
<br>

### 22.2.3 생성자 함수 호출

<br>

생성자 함수 내부의 this에는 생성자 함수가 미래에 생성할 인스턴스가 바인딩된다.<br>

```javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

<br>
<br>
<br>

### bind 메서드

<br>

bind 메서드는 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this 불일치 문제를 해결할 때 유용하게 사용된다.

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

<br>
<br>

bind를 통해 콜백 함수 this 제어가 가능하다.<br>


```javascript
const person = {
  name: 'Lee',
  foo(callback) {
    // ①
    setTimeout(callback, 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // ② Hi! my name is .
  // 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
  // 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
  // Node.js 환경에서 this.name은 undefined다.
});
```

위의 코드를 bind 메서드를 통해 callback 함수의 this로 바인딩한다.

```javascript
const person = {
  name: 'Lee',
  foo(callback) {
    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  }
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee.
});
```