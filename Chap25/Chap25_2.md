## 25.6 클래스의 인스턴스 생성 과정
---

### 1. 인스턴스 생성과 this 바인딩

* new 연산자와 함께 클래스를 호출하면 빈 객체가 생성된다.  
* 이 객체는 this에 바인딩된다.   
* 따라서 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

<br>
<br>

### 2. 인스턴스 초기화

* constructor 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
* 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티 추가하고 인수로 받은 초기값으로 초기화한다.

<br>
<br>

### 3. 인스턴스 변환

* 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 반환한다.

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```

<br>
<br>
<br>
<br>

## 25.7 프로퍼티
---

클래스는 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.

```javascript
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name; // name 프로퍼티는 public하다.
  }
}

const me = new Person('Lee');

// name은 public하다.
console.log(me.name); // Lee
```

<br>
<br>

JS에서는 private, public, protected 키워드와 같은 접근 제한자가 존재하지 않는다.  
따라서 언제나 프로퍼티는 public하다.

<br>

> ES2022부터는 '#' 문자를 통해 private field를 지정할 수 있게 되었다.

<br>
<br>
<br>
<br>

## 25.7.3 클래스 필드 정의 제안
---

JS에서는 constructor 내부에 this 키워드를 통해서 프로퍼티를 정의해야 한다.  
하지만 최신 브라우저 또는 최신 Node.js에서는 클래스 몸체에 클래스 필드를 선언해도 에러가 발생하지 않는다.

```javascript
class Person {
  // 클래스 필드 정의
  name = 'Lee';
}

const me = new Person('Lee');
```

> TC39 프로세스의 stage3에서 JS에서도 위와 같이 클래스 필드처럼 정의할 수 있는 표준 사양이 제안이 되었다.  
> 그리고 표준 사양 승급이 확실시되는 이 제안을 최신 버젼에서 미리 구현을 해놓아서 이처럼 사용할 수 있는 것이다.

<br>
<br>

이때, 클래스 몸체에서 필드를 정의하는 경우 this를 바인딩해서는 안 된다.

```javascript
class Person {
  // this에 클래스 필드를 바인딩해서는 안된다.
  this.name = ''; // SyntaxError: Unexpected token '.'
}
```

<br>

하지만 참조하는 경우엔 반드시 this를 통해 참조를 해야한다.

```javascript
class Person {
  // 클래스 필드
  name = 'Lee';

  constructor() {
    console.log(name); // ReferenceError: name is not defined
  }
}

new Person();
```

<br>

그리고 외부 초기값으로 클래스 필드를 초기화해야 한다면 constructor에서 초기화해야 한다.  
따라서 초기화할 필요가 있따면 굳이 constructor 밖에 필드를 정의할 필요가 없다.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

<br>
<br>
<br>

## 25.7.4 private 필드 정의 제안
---

이전의 JS에서는 public, private, protected 키워드와 같은 접근 제한자를 지원하지 않았다.  
하지만 현재는 '#'를 통한  private 필드 정의를 지원한다.  

```javascript
class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person('Lee');

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```

<br>

> Typescript에서는 public, private, protected를 모두 지원한다.

<br>
<br>

private 필드에 외부에서 직접 접근을 할 수 없지만, 접근자 프로퍼티를 통해 간접적으로 접근할 수는 있다.

```javascript
class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    this.#name = name;
  }

  // name은 접근자 프로퍼티다.
  get name() {
    // private 필드를 참조하여 trim한 다음 반환한다.
    return this.#name.trim();
  }
}

const me = new Person(' Lee ');
console.log(me.name); // Lee
```

<br>
<br>
<br>
<br>

## 25.7.5 static 필드 정의 제안
---

static 키워드를 통해 정적 메서드를 정의할 수 있다.  
하지만 static 키워드를 사용하여 정적 필드를 정의할 수는 없다.  

> 하지만 TC39 프로세스에서 static public, static private 필드를 정의하는 사양이 제안되었고 최신 버젼에서는 이미 구현이 되었다.

```javascript
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

<br>
<br>
<br>
<br>

## 25.8 상속에 의한 클래스 확장
---

상속에 의한 클래스 확장은 프로토타입 기반 상속과는 다른 개념이다.  

* 프로토타입 기반 상속은 프로토타입 체인을 통해 상위 객체의 자산을 **받는** 개념이다.
* 클래스 기반 상속은 기존 클래스를 상속받아 새로운 클래스로 **확장하는** 개념이다.

<br>
<br>

클래스 확장은 동일한 속성을 하나의 부모 클래스로 만들어 이를 상속받는 방식이다.  
이후 부모 클래스 속성을 그대로 사용하면서 고유한 속성을 추가하여 확장할 수 있다.  

<br>

Animal Class(부모 클래스), Bird Class(자식 클래스), Lion Class(자식 클래스) 예시를 살펴보자.

```javascript
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() { return 'eat'; }

  move() { return 'move'; }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() { return 'fly'; }
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat());  // eat
console.log(bird.move()); // move
console.log(bird.fly());  // fly
```

<br>

클래스 기반 상속은 extends 키워드를 통해 확장한다.  
이는 프로토타입 기반 상속과 달리 간편하고 직관적인 방법이다.


<br>
<br>
<br>
<br>

## 25.8.2 extends 키워드
---

extends 키워드를 통해 상속받을 클래스를 정의한다.

```javascript
// 수퍼(베이스/부모)클래스
class Base {}

// 서브(파생/자식)클래스
class Derived extends Base {}
```

<br>

* 상속을 통해 확장된 클래스를 서브클래스(sub-class)라고 부른다.
* 상속된 클래스를 수퍼클래스(super-class)라고 부른다.

<br>

extends 키워드 역할은 수퍼클래스와 서브클래스 간의 상속 관계를 설정하는 것이다.  
이는 인스턴스 간의 프로토타입 체인뿐만 아니라 클래스 간의 프로토타입 체인도 생성한다.  

<br>
<br>
<br>
<br>

## 25.8.3 동적 상속
---

extedns 키워드는 클래스뿐만 아니라 생성자 함수를 상속받아 확장할 수 있다.  
단, extends 키워드 앞에는 클래스가 와야 한다.  

```javascript
// 생성자 함수
function Base(a) {
  this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

<br>
<br>

extends 키워드 다음에는 [[Constructor]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식이 올 수 있다.

```javascript
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```


<br>
<br>
<br>
<br>

## 25.8.4 서브클래스의 constructor
---

앞에서 클래스에서 constructor를 생략하면 암묵적으로 빈 객체를 생성한다고 했다.  
하지만 서브클래스에서 constructor를 생략하면 다른 방식으로 동작한다.
<br>

다음과 같은 constructor가 암묵적으로 정의된다.

```javascript
constructor(...args) { super(...args); }
```

<br>
<br>
<br>

### super 키워드

super 키워드는 함수처럼 호출할 수도 있고 식별자처럼 참조할 수 있는 특수한 키워드이다.  

* super를 호출하면 수퍼클래스의 constructor를 호출한다.
* super를 참조하면 수퍼클래스의 메서드를 참조할 수 있다.

<br>
<br>

### super 호출

super를 호출하면 수퍼 클래스의 constructor를 호출한다.

```javascript
// 수퍼클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브클래스
class Derived extends Base {
  // 다음과 같이 암묵적으로 constructor가 정의된다.
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}
```

<br>
<br>
<br>

### super 참조

메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

```javascript
// 수퍼클래스
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

// 서브클래스
class Derived extends Base {
  sayHi() {
    // super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킨다.
    return `${super.sayHi()}. how are you doing?`;
  }
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

super 참조를 통해 수퍼클래스의 메서드를 참조하려면 super가 바인딩된 객체를 참조할 수 있어야 한다.

