## 이터레이션 프로토콜

이터레이션 프로토콜은 순회 가능한 데이터 컬렉션(자료구조)를 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.  

이터레이션 프로토콜에는 `이터러블 프로토콜`과 `이터레이터 프로토콜`이 있다.

<br>
<br>

> **이터러블 프로토콜**  
> * Symbol.iterator를 직접 구현하거나 상속받아 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.  
> * 이러한 규약을 `이터러블 프로토콜`이라고 한다.  

<br>

> **이터레이터 프로토콜**  
> * Symbol.iterator를 호출하면 `이터레이터`를 반환한다.
> * `이터레이터`는 next 메서드를 소유하며, 해당 메서드를 호출하면 value, done 프로퍼티를 가지는 `이터레이터 리절트 객체`를 반환한다.
> * 이러한 규약을 `이터레이터 프로토콜`이라고 한다.

<br>
<br>
<br>

## 이터러블

* 이터러블 프로토콜을 준수한 객체를 이터러블이라고 한다.

<br>

아래는 이터러블을 확인하는 함수이다.

```javascript
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]);        // -> true
isIterable('');        // -> true
isIterable(new Map()); // -> true
isIterable(new Set()); // -> true
isIterable({});        // -> false
```

<br>

`Symbol.iterator` 메서드르 직접 구현하지 않았거나 상속받지 않았은 객체는 이터러블 객체가 아니다.

* 일반 객체는 `for ... of 문`으로 순회할 수 없으며 `배열 디스트럭처링`이 불가능하다.

```javascript
const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메서드를 구현하거나 상속받지 않는다.
// 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for...of 문으로 순회할 수 없다.
for (const item of obj) { // -> TypeError: obj is not iterable
  console.log(item);
}

// 이터러블이 아닌 일반 객체는 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.
const [a, b] = obj; // -> TypeError: obj is not iterable
```

<br>
<br>
<br>

## 이터레이터

이터러블 객체의 `Symbol.iterator 메서드`를 호출하면 이터레이터 프로토콜을 준수한 `이터레이터`를 반환한다.

<br>

* 이터레이터는 next 메서드를 갖는다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
console.log('next' in iterator); // true
```

<br>

* 이터레이터의 next는 이터러블 각 요소를 순회하기 위한 포인터 역할을 한다.
* 결과값으로 `이터레이터 리절트 객체`를 반환한다.

```javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다. 이터레이터는 next 메서드를 갖는다.
const iterator = array[Symbol.iterator]();

// next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를
// 반환한다. 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

<br>
<br>
<br>

## for ... of  문

`for ... of 문`은 이터러블을 순회하면서 요소를 변수에 할당한다.

```javascript
for (변수 선언문 of 이터러블){ ... }
```

<br>

`for ... of 문`은 `for ... in 문`과 매우 유사하다.
```javascript
for (변수 선언문 in 객체){ ... }
```

<br>

* `for ... in 문`은 [[Enumerable]] 값이 true인 프로퍼티를 순회하며 열거한다.

* `for ... of 문`은 이터러블을 next 메서드를 통해 순회하며 `이터레이터 리절트 객체`를 변수에 할당한다.

<br>
<br>

`for ... of 문`은 내부 동작을 for 문으로 표현하면 다음과 같다.

```javascript
// 이터러블
const iterable = [1, 2, 3];

// 이터러블의 Symbol.iterator 메서드를 호출하여 이터레이터를 생성한다.
const iterator = iterable[Symbol.iterator]();

for (;;) {
  // 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다. 이때 next 메서드는 이터레이터 리절트 객체를 반환한다.
  const res = iterator.next();

  // next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true이면 이터러블의 순회를 중단한다.
  if (res.done) break;

  // 이터레이터 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
  const item = res.value;
  console.log(item); // 1 2 3
}
```

<br>
<br>
<br>

## 이터러블과 유사 배열 객체

유사 배열 객체는 배열처럼 `인덱스`로 프로퍼티 값에 접근할 수 있고 `length 프로퍼티`를 갖는 객체를 말한다.

```javascript
// 유사 배열 객체
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

// 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있다.
for (let i = 0; i < arrayLike.length; i++) {
  // 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있다.
  console.log(arrayLike[i]); // 1 2 3
}
```

<br>

* 유사 배열 객체는 이터러블이 아닌 일반 객체이므로 Symbol.iterator가 없다.
* 즉, 유사 배열 객체는 `for ... of 문`으로 순회할 수 없다.

```javascript
// 유사 배열 객체는 이터러블이 아니기 때문에 for...of 문으로 순회할 수 없다.
for (const item of arrayLike) {
  console.log(item); // 1 2 3
}
// -> TypeError: arrayLike is not iterable
```

<br>
<br>

* 하지만 모든 유사 배열 객체가 이터러블이 아닌 것은 아니다.
* arguments, NodeList, HTMLCOllection와 같은 객체는 유사 배열 객체이면서 이터러블이다.
* 해당 객체들은 유사 배열 객체의 구조를 가지는 동시에 Symbol.iterator 메서드가 존재한다.


> 유사 배열 객체는 Array.from 메서드를 통해 배열로 변환하여 이터러블처럼 사용이 가능하다.

<br>

```javascript
// 유사 배열 객체
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

// Array.from은 유사 배열 객체 또는 이터러블을 배열로 변환한다
const arr = Array.from(arrayLike);
console.log(arr); // [1, 2, 3]
```

<br>
<br>
<br>

## 이터레이션 프로토콜의 필요성

* ES6 이전의 순회 가능한 데이터 컬렉션은 통일된 규약 없이 각자 나름의 구조를 가지고 for문, for ... in 문, forEach 메서드 등 다양한 방법으로 순회할 수 있었다.

* 만약 이러한 데이터를 제공하는 `데이터 공급자`가 각자의 순회 방식을 갖는다면 `데이터 소비자`는 다양한 순회 방식을 모두 지원해야 한다. 이는 매우 비효율적이다.

> 즉, **이터레이션 프로토콜**를 통해 순회 방식을 정의하여 `데이터 소비자`가 효율적으로 순회 방식 지원하게 하는 것이 **이터레이션 프로토콜**의 목적이다.

<br>
<br>

## 사용자 정의 이터러블

이터레이션 프로토콜을 준수하지 않는 일반 객체도 `Symbol.iterator 메서드`를 구현하면 이터러블이 된다.  
아래 피보나치 수열의 예시를 통해 확인해보자.

```javascript
// 피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
  // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수한다.
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1]; // "36.1. 배열 디스트럭처링 할당" 참고
    const max = 10; // 수열의 최대값

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 하고
    // next 메서드는 이터레이터 리절트 객체를 반환해야 한다.
    return {
      next() {
        [pre, cur] = [cur, pre + cur]; // "36.1. 배열 디스트럭처링 할당" 참고
        // 이터레이터 리절트 객체를 반환한다.
        return { value: cur, done: cur >= max };
      }
    };
  }
};

// 이터러블인 fibonacci 객체를 순회할 때마다 next 메서드가 호출된다.
for (const num of fibonacci) {
  console.log(num); // 1 2 3 5 8
}
```
