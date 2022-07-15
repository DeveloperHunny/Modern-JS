## 21.1 JS 객체의 분류
---

JS 객체는 3개의 객체로 분류가 가능하다.

- 표준 빌트인 객체
- 호스트 객체
- 사용자 정의 객체
  

<br>
<br>
<br>
<br>

## 21.2 표준 빌트인 객체
---

JS는 Object, String, Number, Boolean 등 40여 개의 표준 빌트인 객체를 제공함.<br>
이러한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수 객체이다.<br>

<br>

```javascript
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); // String {"Lee"}
console.log(typeof strObj);       // object

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123); // Number {123}
console.log(typeof numObj);     // object

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj= new Boolean(true); // Boolean {true}
console.log(typeof boolObj);      // object

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x'); // ƒ anonymous(x )
console.log(typeof func);                       // function

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3); // (3) [1, 2, 3]
console.log(typeof arr);        // object

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i); // /ab+c/i
console.log(typeof regExp);         // object

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();  // Fri May 08 2020 10:43:25 GMT+0900 (대한민국 표준시)
console.log(typeof date); // object
```
위와 같이 생성자 함수로 호출하여 인스턴스를 생성할 수 있다.

<br>
<br>

표준 빌트인 객체는 인스턴스 없이 정적으로 호출할 수 있는 정적 메서드 또한 제공한다.
```javascript
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); // Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드다.
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다.
console.log(numObj.toFixed()); // 2

// isInteger는 Number의 정적 메서드다.
// Number.isInteger는 인수가 정수(integer)인지 검사하여 그 결과를 Boolean으로 반환한다.
console.log(Number.isInteger(0.5)); // false
```

* 인스턴스 없이 객체 자체로 가능한 메서드가 존재. (정적 메서드)

<br>
<br>
<br>
<br>

## 21.3 원시값과 래퍼 객체
---

String, Number, Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유는 무엇일까?

> 바로 원시 값을 객체처럼 동작하게 만들기 위해서이다.

<br>
<br>

예를 들어, 문자열은 원시값이므로 객체처럼 프로퍼티나 메서드를 가질 수 없는데도 마치 객체처럼 동작한다.
```javascript
const str = 'hello';

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
```

이는 원시값인 문자열, 숫자, 불리언 값에 마치 객체처럼 마침표 표기법으로 접근하면 JS 엔진이 일시적으로 연관된 객체로 변환해주기 때문에 가능하다.<br>

이처럼 **원시값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체(Wrapper Object)** 라고 한다.

<br>
<br>

예를 들어, 문자열에 대해 마침표 표기법으로 접근하면 String 래퍼 객체가 생성되고 String 객체처럼 활용이 가능해진다.
```javascript
const str = 'hi';

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str.length); // 2
console.log(str.toUpperCase()); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
console.log(typeof str); // string
```
위의 코드처럼 일시적으로 래퍼 객체로 변환하여 특정 메서드나 프로퍼티를 처리한 후 다시 원시값으로 반환한다.<br>
그 후 쓸모가 없어진 래퍼 객체는 가비지 컬렉션의 대상이 된다.<br>

> 이때 생성되는 래퍼 객체의 [['특정Object'Data]] 내부슬롯에 접근한 프로퍼티나 메서드가 할당되고 사용이 끝나면 버려진다.

<br>
<br>
<br>
<br>

## 21.4 전역 객체
---

전역 객체는 코드가 실행되기 전에 JS엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이다.<br>
브라우저 환경에서는 window , Node.js 환경에서는 global이 전역 객체이다.<br>

> globalThis는 다양한 전역 객체를 통일한 식별자이다. 따라서 어떤 브라우저 환경이든 Node.js 환경이든 상관없이 전역 객체를 가리킨다.

<br>
<br>

**전역 객체가 소유한 프로퍼티 종류**
* 표준 빌트인 객체(Object, String, Number, Function)
* 호스트 객체(Web API, 호스트 API)
* var 키워드로 선언한 전역 변수와 전역 함수
  
<br>
<br>

**전역 객체의 특징**
* 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수는 존재하지 않는다.
* 전역 객체 프로퍼티를 참조할 때 window or global와 같은 식별자를 생략할 수 있다.

<br>
<br>
  
var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다.<br>
**let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉, 전역 객체 식별자로 접근이 불가능하다.**

```javascript
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 암묵적 전역. bar는 전역 변수가 아니라 전역 객체의 프로퍼티다.
bar = 2; // window.bar = 2
console.log(window.bar); // 2

// 전역 함수
function baz() { return 3; }
console.log(window.baz()); // 3
```

<br>
<br>

모든 JS코드는 하나의 전역 객체를 공유하다. <br>
즉, 여러 개의 script를 통해 코드를 분리하더라도 결국 하나의 전역 객체만을 공유하고 있다.

<br>
<br>
<br>
<br>

## 21.4.2 빌트인 전역 프로퍼티
---

### Infinity

Infinity 프로퍼티는 무한대를 나타내는 숫자값 Infinity를 갖고있다.
```javascript
// 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); // true

// 양의 무한대
console.log(3/0);  // Infinity
// 음의 무한대
console.log(-3/0); // -Infinity
// Infinity는 숫자값이다.
console.log(typeof Infinity); // number
```

<br>
<br>

### NaN
NaN 프로퍼티는 숫자가 아님(Not-a-Number)을 나타내는 숫자값을 NaN을 갖고 있다.<br>
이는 Number.NaN과 동일하다.

```javascript
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number
```

<br>
<br>

### undefined
undefined 프로퍼티는 원시 타입 undefined를 값으로 갖는다.

```javascript
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

<br>
<br>
<br>
<br>

## 21.4.2 빌트인 전역 함수
---

### eval

eval 함수는 JS코드를 나타내는 문자열을 인수로 받는다.<br>
전달받은 문자열 코드가 표현식이라면 값을 생성하고<br>
전달받은 문자열 코드가 표현식이 아닌 문이라면 런타임에 해당 코드를 실행한다.<br>

```javascript
// 표현식인 문
eval('1 + 2;'); // -> 3
// 표현식이 아닌 문
eval('var x = 5;'); // -> undefined

// eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언되었다.
console.log(x); // 5

// 객체 리터럴은 반드시 괄호로 둘러싼다.
const o = eval('({ a: 1 })');
console.log(o); // {a: 1}

// 함수 리터럴은 반드시 괄호로 둘러싼다.
const f = eval('(function() { return 1; })');
console.log(f()); // 1
```

<br>

eval 함수를 통해 사용자로부터 입력 받은 콘텐츠를 실행하는 것은 보안에 매우 취약하다.<br>
뿐만 아니라 JS 엔진에 의해 코드 최적화가 수행되지 않으므로 속도가 느리다.<br>

> 즉, eval 함수의 사용은 금지해야 한다.


<br>
<br>

### isFinite

전달받은 인수가 유한수면 true, 무한수면 false를 반환하다.<br>
전달받은 인수가 숫자가 아니면 숫자로 타입을 변환하여 평가하고, 변환이 불가능하면 false를 반환한다.<br>

```javascript
// 인수가 유한수이면 true를 반환한다.
isFinite(0);    // -> true
isFinite(2e64); // -> true
isFinite('10'); // -> true: '10' → 10
isFinite(null); // -> true: null → 0

// 인수가 무한수 또는 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(Infinity);  // -> false
isFinite(-Infinity); // -> false

// 인수가 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(NaN);     // -> false
isFinite('Hello'); // -> false
isFinite('2005/12/12'); // -> false
```

> 이때 null은 숫자로 변환하면 0이므로 isFinite(null)은 true를 반환한다.

<br>
<br>

## isNaN
전달받은 인수가 NaN이면 true, 아니면 false를 반환한다.

```javascript
// 숫자
isNaN(NaN); // -> true
isNaN(10);  // -> false

// 문자열
isNaN('blabla'); // -> true: 'blabla' => NaN
isNaN('10');     // -> false: '10' => 10
isNaN('10.12');  // -> false: '10.12' => 10.12
isNaN('');       // -> false: '' => 0
isNaN(' ');      // -> false: ' ' => 0

// 불리언
isNaN(true); // -> false: true → 1
isNaN(null); // -> false: null → 0

// undefined
isNaN(undefined); // -> true: undefined => NaN

// 객체
isNaN({}); // -> true: {} => NaN

// date
isNaN(new Date());            // -> false: new Date() => Number
isNaN(new Date().toString()); // -> true:  String => NaN
```

<br>
<br>

### parseFloat & parseInt

전달받은 문자열 인수를 실수 & 정수로 해석하여 반환한다.

이때 parseInt는 두번째 인자로 기수(2진수 , 8진수 등등)을 입력받아 기수에 맞게 처리하여 반환할 수 있다.

```javascript
// 10'을 10진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10'); // -> 10
// '10'을 2진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10', 2); // -> 2
// '10'을 8진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10', 8); // -> 8
// '10'을 16진수로 해석하고 그 결과를 10진수 정수로 반환한다
parseInt('10', 16); // -> 16
```

<br>
<br>

### encodeURI / decodeURI

encodeURI 함수는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.

> URI는 인터넷에 있는 자원을 나타내는 주소를 말한다. 하위 개념으로 URL, URN이 있다.

<br>
<br>

인코딩이란 URI 문자들을 이스케이프 처리하는 것을 의미한다.

> 이스케이프 처리는 어떤 시스템에서도 읽을 수 있는 문자 셋으로 문자열을 변환하는 것이다.

예를 들어, 한글 '가'는 '%EC%9E%90'으로 인코딩된다.

```javascript
// 완전한 URI
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher
```

<br>
<br>

decodeURI는 encodeURI와는 정반대의 동작을 수행한다. <br>
즉, 인코딩된 문자열을 전달받아 이스케이프 처리되기 이전으로 문자열을 되돌려 반환한다.<br>

```javascript
const uri = 'http://example.com?name=이웅모&job=programmer&teacher';

// encodeURI 함수는 완전한 URI를 전달받아 이스케이프 처리를 위해 인코딩한다.
const enc = encodeURI(uri);
console.log(enc);
// http://example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

// decodeURI 함수는 인코딩된 완전한 URI를 전달받아 이스케이프 처리 이전으로 디코딩한다.
const dec = decodeURI(enc);
console.log(dec);
// http://example.com?name=이웅모&job=programmer&teacher
```



