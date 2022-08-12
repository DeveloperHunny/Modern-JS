## 심벌이란?

심벌은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값이다.  
심벌 값은 다른 값과 중복되지 않는 유일무이한 값이다.

<br>
<br>

## 심벌 값의 생성

Symbol 함수를 호출하여 심벌을 생성할 수 있다.

* 이때 생성된 값은 **다른 값과 절대 중복되지 않는 유일무이한 값이다.**
* 또한 심벌 값은 외부로 노출되지 않아 확인할 수 없다.

```javascript
// Symbol 함수를 호출하여 유일무이한 심벌 값을 생성한다.
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
console.log(mySymbol);        // Symbol()
```

> 심벌은 다른 생성자 함수와 달리 new 연산자와 함께 쓰이지 않는다.


<br>
<br>

* Symbol 함수에서 문자열을 선택적으로 인수로 전달할 수 있다.
* 이는 오로지 디버깅 용도로만 사용되므로 실제 심벌 값에서는 어떠한 영향을 주지 않는다.

```javascript
// 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

<br>
<br>

## Symbol.for / Symbol.keyFor 메서드

Symbol.for 메서드는 인수로 전달받은 문자열을 키로 `전역 심벌 레지스트리에`서 해당 키와 일치하는 심벌 값을 검색한다.

* 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환한다.
* 검색에 실패하면 새로운 심벌 값을 생성하여 반환한다.

```javascript
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for('mySymbol');

console.log(s1 === s2); // true
```

<br>

* Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 갑스이 키를 추출할 수 있다.

```javascript
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s1); // -> mySymbol

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s2 = Symbol('foo');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s2); // -> undefined
```

<br>
<br>
<br>

## 심벌과 상수

특정 경우에는 변경되지 않는 상수의 값 자체에 특별한 의미가 없고 이름 자체에 의미가 있는 경우가 있다.
이러한 경우에는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

```javascript
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
// 중복될 가능성이 없는 심벌 값으로 상수 값을 생성한다.
const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right')
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

<br>
<br>

##  심벌과 프로퍼티 은닉

심벌 값을 프로퍼티 키로 사용하면 `for ... in 문`이나 Object.keys 등등 다른 메서드로 찾을 수 없다.  
이처럼 심벌 값을 이용하면 외부로부터 프로퍼티를 은닉할 수 있다.

```javascript
const obj = {
  // 심벌 값으로 프로퍼티 키를 생성
  [Symbol('mySymbol')]: 1
};

for (const key in obj) {
  console.log(key); // 아무것도 출력되지 않는다.
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
```

<br>
<br>

## Well-known Symbol

JS에서 기본 제공하는 빌트인 심벌 값들이 있다.  

* JS가 기본 제공하는 빌트인 심벌 값을 `Well-known Symbol`이라 부른다.

