## 16.1 내부 슬롯과 내 메서드
---

내부 슬롯과 내부 메서드는 JS엔진의 내부 로직이다. <br>
따라서 개발자가 직접적으로 접근이 불가능하지만 __proto__ 키워드를 통해 간접적으로 접근이 가능하다.<br>

> 내부 슬롯과  내부 메서드는 [[...]]로 감싼 이름들이다.

```javascript
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // -> Object.prototype
```

<br>

## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
---

JS 엔진은 프로퍼티를 생성할 때, 프로퍼티 어트리뷰트를 자동으로 정의함.

> [[Value]] : 프로퍼티 값 <br>
> [[Writable]] : 값 갱신 가능 여부 <br>
> [[Enumerable]] : 열거 가능 여부 <br>
> [[Configurable]] : 재정의 가능 여부 <br>

<br>

해당 내부 슬롯에 직접 접근을 할 수 없지만, Object.getOwnPropertyDescriptor 메서드를 통해 간접적으로 확인은 가능.

```javascript
const person = {
  name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

## 16.3 데이터 프로퍼티와 접근자 프로퍼티
---

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 나뉜다.

> 데이터 프로퍼티 : 키와 값으로 구성된 일반적인 프로퍼티 <br>
> 접근자 프로퍼티 : 자체적으로 값을 갖기 않고 다른 프로퍼티 읽거나 호출되는 접근자 함수로 구성된 프로퍼티 <br>

<br>

## 16.3.1 데이터 프로퍼티
---

JS엔진이 자동으로 다음 프로퍼티 어트리뷰트를 생성한다.

> [[Value]] : 프로퍼티 값(반한되는 값) <br>
> [[Writable]] : 값 갱신 가능 여부(true/false) <br>
> [[Enumerable]] : 열거 가능 여부(true/false) <br>
> [[Configurable]] : 재정의 가능 여부(true/false) <br>

<br>

## 16.3.2 접근자 프로퍼티
---

접근자 프로퍼티는 자체적으로 값을 갖지 않고 접근자 함수로 구성된다.<br>
다음과 같은 프로퍼티 어트리뷰트를 가진다.

> [[Get]] : 값을 읽을 때 호출되는 접근자 함수 <br>
> [[Set]] : 값을 저장할 때 호출되는 접근자 함수 <br>
> [[Enumerable]] : 열거 가능 여부(true/false) <br>
> [[Configurable]] : 재정의 가능 여부(true/false) <br>

<br>

접근자 함수는 흔히 알고 있는 Getter, Setter 함수를 말함.
```javascript
const person = {
  // 데이터 프로퍼티
  firstName: 'Ungmo',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
    [this.firstName, this.lastName] = name.split(' ');
  }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

<br>

** 프로퍼티 접근 식 JS엔진 내부 동작 과정 **

> 1. 유효한 프로퍼티 키인지 확인 (문자열 or 심벌)<br>
> 2. 해당 프로퍼티 키가 존재한지 확인 <br>
> 3. 찾은 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인 <br>
> 4. 접근자 프로퍼티인 경우 [[Get]] , [[Set]]를 통해 함수 호출

<br>

## 16.4 프로퍼티 정의
---

프로퍼티 정의란 프로퍼티를 새로 추가하거나 기존 프로퍼티를 재정의하는 것을 말한다. <br>
예를 들어, 프로퍼티 값을 갱신이 가능하도록, 열거 가능하도록, 재정의 가능하도록 등 프로퍼티가 어떻게 동작하는지 재정의 가능하다.<br>

<br>

Object.defineProperty 메서드를 사용하여 어트리뷰트 정의가 가능하다.
```javascript
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
  value: 'Ungmo',
  writable: true,
  enumerable: true,
  configurable: true
});

Object.defineProperty(person, 'lastName', {
  value: 'Lee'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false인 경우
// 해당 프로퍼티는 for...in 문이나 Object.keys 등으로 열거할 수 없다.
// lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않는다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// lastName 프로퍼티는 [[Writable]]의 값이 false이므로 값을 변경할 수 없다.
// 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 삭제할 수 없다.
// lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// [[Configurable]]의 값이 false인 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  // getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}
```

## 객체 변경 방지
---
객체는 변경 가능한 값으로 재할당 없이 직접 변경할 수 있다. <br>
이때 객체 변경 방지 메서드들을 통해 그 정도를 정할 수 있다.<br>

| 구분 | 메서드 | 추가 | 삭제 | 읽기 | 쓰기 | 재정의 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|객체 확장 금지 | Object.preventExtensions | X | O | O | O | O |
| 객체 밀봉 | Object.seal | X | X | O | O | X |
| 객체 동결  | Object.freeze | X | X | O | X | X |

<br>

> 객체 확장 금지

확장이 금지된 객체는 프로퍼티 추가가 금지된다. <br>
프로퍼티 동적 추가와 Object.defineProperty 추가 방식 모두 금지된다. <br>

<br>

> 객체 밀봉

밀봉된 객체는 읽기와 쓰기만 가능하다.<br>
프로퍼티 추가 & 삭제 & 어트리뷰트 재정의가 금지된다. <br>

<br>

> 객체 동결

동결된 객체는 읽기 외 모든 기능이 금지된다.<br>

<br>

### 16.5.4 불변 객체
---

위에서 말한 객체 동결로는 얕은 변경 방지만 가능하다. <br>
즉, 중첩 객체에 대해서는 영향을 못 준다. <br>

```javascript
const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};

// 얕은 객체 동결
Object.freeze(person);

// 직속 프로퍼티만 동결한다.
console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Busan"}}
```

<br>

중첩된 객체까지 freeze 시켜서 변경을 막는 완전 불변 객체를 만들기 위해선 모든 프로퍼티에 대해 재귀적으로 Object.freeze를 호출해야 한다.

```javascript
function deepFreeze(target) {
  // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    /*
      모든 프로퍼티를 순회하며 재귀적으로 동결한다.
      Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
      ("19.15.2. Object.keys/values/entries 메서드" 참고)
      forEach 메서드는 배열을 순회하며 배열의 각 요소에 대하여 콜백 함수를 실행한다.
      ("27.9.2. Array.prototype.forEach" 참고)
    */
    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Seoul"}}
```