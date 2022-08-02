## Number 생성자 함수
---


Number 객체는 생성자 함수 객체이다.  
new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.

* Number 생성자 함수에 인수를 전달하지 않으면 [[NumberData]]에 0이 할당된 `Number 래퍼 객체`를 생성한다.

```javascript
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}
```

<br>
<br>
<br>

## Number 프로퍼티
---

### Number.EPSILON

Number.EPSION은 매우 작은 수를 의미한다.  
약 `2.220446 * 10^-16`을 의미한다.

<br>

* Number.EPSILON은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.

```javascript
function isEqual(a, b){
  // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // -> true
```

<br>
<br>

### Number.MAX_VALUE

Number.MAX_VALUE는 가장 큰 양수 값이다.  
이보다 더 큰 숫자는 `Infinity`이다.  

```javascript
Number.MAX_VALUE; // -> 1.7976931348623157e+308
Infinity > Number.MAX_VALUE; // -> true
```

* 이와 반대되는 `Number.MIN_VALUE`도 존재한다.

<br>
<br>

### Number.MAX_SAFE_INTEGER

`Number.MAX_SAFE_INTEGER`은 JS에서 가장 안전하게 표현할 수 있는 가장 큰 정수값이다.

```javascript
Number.MAX_SAFE_INTEGER; // -> 9007199254740991
```

* 이와 반대되는 `Number.MIN_SAFE_INTEGER`도 존재한다.


<br>
<br>

### Number.NaN

Number.NaN은 숫자가 아님을 나타내는 숫자값이다.

<br>
<br>
<br>
<br>

## Number 메서드
---

### Number.isFinite

인수로 전달된 숫자값이 `유한수`인지 아닌지를 검사하여 결과를 불이언 값으로 반환한다.

```javascript
// 인수가 정상적인 유한수이면 true를 반환한다.
Number.isFinite(0);                // -> true
Number.isFinite(Number.MAX_VALUE); // -> true
Number.isFinite(Number.MIN_VALUE); // -> true

// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity);  // -> false
Number.isFinite(-Infinity); // -> false
```

* 만약 전달된 인수가 NaN이면 언제나 false를 반환한다.

<br>
<br>

### Number.isInteger

인수로 전달된 숫자값이 `정수`인지 아닌지를 검사하여 결과를 불이언 값으로 반환한다.


```javascript
// 인수가 정수이면 true를 반환한다.
Number.isInteger(0)     // -> true
Number.isInteger(123)   // -> true
Number.isInteger(-123)  // -> true

// 0.5는 정수가 아니다.
Number.isInteger(0.5)   // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger('123') // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger(false) // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isInteger(Infinity)  // -> false
Number.isInteger(-Infinity) // -> false
```

<br>
<br>


### Number.isNaN

인수로 전달된 숫자값이 `NaN`인지 아닌지를 검사하여 결과를 불이언 값으로 반환한다.

```javascript
// 인수가 NaN이면 true를 반환한다.
Number.isNaN(NaN); // -> true
```

<br>
<br>

### Number.prototype.toExponential

`toExponential` 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다.

```javascript
(77.1234).toExponential();  // -> "7.71234e+1"
(77.1234).toExponential(4); // -> "7.7123e+1"
(77.1234).toExponential(2); // -> "7.71e+1"
```


### Number.prototype.toFixed

`toFixed` 메서드는 숫자를 반올림하여 문자열로 반환한다,

```javascript
// 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toFixed(); // -> "12346"
// 소수점 이하 1자리수 유효, 나머지 반올림
(12345.6789).toFixed(1); // -> "12345.7"
// 소수점 이하 2자리수 유효, 나머지 반올림
(12345.6789).toFixed(2); // -> "12345.68"
// 소수점 이하 3자리수 유효, 나머지 반올림
(12345.6789).toFixed(3); // -> "12345.679"
```

### Number.prototype.toPrecision

`toPrecision` 메서드는 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다.

```javascript
// 전체 자리수 유효. 인수를 전달하지 않으면 기본값 0이 전달된다.
(12345.6789).toPrecision(); // -> "12345.6789"
// 전체 1자리수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // -> "1e+4"
// 전체 2자리수 유효, 나머지 반올림
(12345.6789).toPrecision(2); // -> "1.2e+4"
// 전체 6자리수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // -> "12345.7"
```