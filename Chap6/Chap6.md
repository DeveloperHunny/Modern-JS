## 6. 데이터 타입
---

JS에센 총 7개의 데이터 타입을 제공하고 있다.

> 1. 숫자 타입
> 2. 문자열 타입
> 3. 불리언 타입
> 4. undefined 타입
> 5. null 타입
> 6. 심벌 타입
> 7. 객체 타입

<br>
<br>

## 6.1 숫자 타입
---

C나 자바의 경우 정수와 실수를 구분해서 int, long, float, double 같은 다양한 숫자타입을 제공한다.<br>
하지만 JS에선 하나의 숫자 타입만이 존재한다.<br>

<br>

Javascript에선 모두 타입의 숫자를 메모리에 64비트 부동소수점 형식의 2진수로 저장된다.<br>
즉, 모두 실수로 처리한다고 볼 수 있다.<br>

```javascript
var binary = 0b01000001; // 2진수
var octal = 0o101;       // 8진수
var hex = 0x41;          // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65
console.log(binary === octal); // true
console.log(octal === hex);    // true
```

<br>

위에서 JS에선 모든 숫자 타입을 실수로 처리한다고 했다.<br> 
따라서 정수 간의 연산에서 실수가 나올 수 있음을 주의하자.<br>
```javascript
// 숫자 타입은 모두 실수로 처리된다.
console.log(1 === 1.0); // true
console.log(4 / 2);     // 2
console.log(3 / 2);     // 1.5
```

<br>

추가적으로 3가지 특별한 값도 표현할 수 있다.

> Infinity : 양의 무한대 <br>
> -Infinity : 음의 무한대 <br>
> NaN : 산술 연산 불가<br>

```javascript
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0);       // Infinity
console.log(10 / -0);      // -Infinity
console.log(1 * 'String'); // NaN
```

<br>
<br>

## 6.2 문자열 타입
---

JS에서 문자열은 작은따옴표(''), 큰따옴표(""), 백틱(``)으로 표현한다.<br>
가장 일반적인 표기법은 작은따옴표('')를 사용하는 것이다.<br>

```javascript
// 문자열 타입
var string;
string = '문자열'; // 작은따옴표
string = "문자열"; // 큰따옴표
string = `문자열`; // 백틱 (ES6)

string = '작은따옴표로 감싼 문자열 내의 "큰따옴표"는 문자열로 인식된다.';
string = "큰따옴표로 감싼 문자열 내의 '작은따옴표'는 문자열로 인식된다.";
```

<br>
<br>

## 6.3 템플릿 리터럴
---

ES6부터 템플릿 리터럴이라고 하는 새로운 문자열 표기법이 도입되었다.<br>
멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등 편리한 문자열 처리 기능을 제공한다.<br>
템플릿 리터럴은 백틱(``)을 사용하여 표현한다.<br>

```javascript
var template = `Template literal`;
console.log(template); // Template literal
```

<br>
<br>

## 6.3.1 멀티라인 문자열
---
일반 문자열에서 줄바꿈(개행)이 허용되지 않는다.<br>
따라서 일반 문자열 내에서 줄바꿈 등 공백을 표현할려면 백슬래시(\)를 사용해서 표현해야 한다.<br>

<br>

예를 들어, 일반 문자열에서 줄바꿈과 들여쓰기가 적용된 HTML 문자열을 쓰려면 다음과 같이 작성해야 한다.
```javascript
var template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';

console.log(template);
/*
<ul>
  <li><a href="#">Home</a></li>
</ul>
*/
```

<br>

그러나 백틱(``)을 사용하면 쉽게 다음과 같이 쉽게 사용이 가능하다.

```javascript
var template = `<ul>
  <li><a href="#">Home</a></li>
</ul>`;

console.log(template);
/*
<ul>
  <li><a href="#">Home</a></li>
</ul>
*/
```

<br>
<br>

## 6.3.2 표현식 삽입
---

문자열은 문자열 연산자 '+'를 사용해 연결할 수 있다.<br>
'+' 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자라 동작하고, 그 외의 경우는 덧셈 연산자로 동작한다.
```javascript
var first = 'Ung-mo';
var last = 'Lee';

// ES5: 문자열 연결
console.log('My name is ' + first + ' ' + last + '.'); // My name is Ung-mo Lee.
```

<br>

템플릿 리터럴 내에서서는 표현식 삽입을 통해 간단히 문자열을 삽입할 수 있다.<br>
이를 통해 가독성도 올리고 간편한게 문자열 조합이 가능하다.<br>
표현식을 삽입할며녀 ${}로 표현식을 감싸면 된다.

```javascript
var first = 'Ung-mo';
var last = 'Lee';

// ES6: 표현식 삽입
console.log(`My name is ${first} ${last}.`); // My name is Ung-mo Lee.
```

<br>
<br>

## 6.4 불리언 타입
---
불리언 타입은 true & false 뿐이다.
```javascript
var foo = true;
console.log(foo); // true

foo = false;
console.log(foo); // false
```

<br>
<br>

## 6.5 undefined 타입
---

> undefined 타입의 값은 undefined가 유일하다. (이 외의 값 할당 불가.)<br>

<br>

undefined 값은 var 키워드로 선언한 변수에 암묵적으로 할당된다. <br>
즉, 변수 선언에 의해 메모리 공간이 할당이 이뤄질 때까지 쓰레기 값으로 두지 않고 undefined로 초기화한다는 의미이다.<br>

```javascript
var foo;
console.log(foo); // undefined
```

<br>

만약 변수를 참조했을 때 undefined가 반환이 된다면 참조한 변수가 선언 이후에 값이 할당된 적이 없는 변수라는 것을 알 수 있다. <br>

JS에서 undefined는 개발자가 의도적으로 사용하라고 만든 타입이 아닌 변수 초기화를 위해 따로 만든 타입이다.<br>
따라서 개발자가 변수에 값이 없다는 걸 명시하고 싶다면 null 타입을 할당하는 것을 권장한다.<br>

<br>
<br>

## 6.4 null 타입
---

> null 타입 값은 null이 유일하다.

null 타입은 대소문자를 구분하므로 null은 Null, NULL과 다르다.<br>
null 타입은 해당 변수에 값이 없다는 것을 의도적으로 명시할 때 사용한다.<br>
따라서 이전에 할당되어 있던 값에 참조를 명시적으로 제거한다.<br>
 JS엔진 해당 참조되지 않는 메모리 공간에 대해 가비지 콜렉션을 수행한다.

```javascript
var foo = 'Lee';

// 이전에 할당되어 있던 값에 대한 참조를 제거. foo 변수는 더 이상 'Lee'를 참조하지 않는다.
// 유용해 보이지는 않는다. 변수의 스코프를 좁게 만들어 변수 자체를 재빨리 소멸시키는 편이 낫다.
foo = null;
```

<br>
<br>

## 6.7 심벌 타입
---

심벌(Symbol) 타입은 ES6에서 추가된 7번째 타입으로 변경 불가능한 원시 타입의 값이다.<br>
해당 타입은 다른 값과 중복되지 않는 유일무이한 값이다.<br>
심벌 이외의 원시 값은 리터럴을 통해 생성하지만 심벌 타입은 Symbol 함수를 호출해 생성한다.<br>

```javascript
// 심벌 값 생성
var key = Symbol('key');
console.log(typeof key); // symbol

// 객체 생성
var obj = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
obj[key] = 'value';
console.log(obj[key]); // value
```

<br>
<br>

## 6.8 객체 타입
---

자바스크립트에서 데이터 타입을 크게 객체 타입과 원시 타입으로 나눈다.<br>
이는 객체 타입과 원시 타입이 근본적으로 다르다는 의미이다.<br>
앞 서 말한 6가지의 데이터 타입 이외의 모든 값은 객체 타입이다.<br>
<br>
**자바스크립트를 이루고 있는 거의 모든 것이 객체 타입이다.**

<br>
<br>

## 6.9.1  데이터 타입에 의한 메모리 공간의 확보와 참조
---

값은 메모리에 저장하고 참조할 수 있어야 한다.<br> 
따라서 값을 저장하기 위해선 먼저 메모리 공간을 얼마나 사용할 것인지 크기를 결정해야 한다.

```javascript
var score = 100;
```
위의 코드에서 JS엔진은 해당 변수를 숫자 타입으로 생각하고 미리 정해놓은 숫자 타입의 크기만큼 메모리 공간을 확보한다.<br>
그 이후 해당 공간에 값을 저장하여 참조가 가능하게 만든다.<br>

<br>

이번에는 값을 참조하는 경우를  생각해보자. 위의 숫자 타입의 메모리 공간은 총 8바이트 공간을 차지하므로 선두 셀의 주소를 참조하여 총 8개의 메모리 셀의 정보를 읽어들이면 된다. <br>
이는 해당 타입이 숫자 타입이라고 알고 있기에 8개의 메모리 셀이 필요한 것을 알고 읽어드린다.<br>

<br>

만약 JS엔진이 몇 개의 메모리 셀을 읽어야 하는지 모른다면 어떻게 될까?<br>
그러면 개발자가 의도한 값을 제대로 읽어들이지 못하고 이상한 값을 반환하게 되어 심각한 오류를 초래하게 될 것이다.<br>

<br>
<br>

## 6.9.2 데이터 타입에 의한 값의 해석
---

아직 문제가 남아있다. 읽어들인 2진수 데이터를 어떻게 해석해야 하느냐이다.<br>
예를 들어, 메모리에 젖아된 값 0100 0001을 숫자로 해서갛면 65지만 문자로 해석하면 'A'이다.<br>
이를 데이터 타입에서 정해주어 우리는 읽어들인 2진수 데이터를 알맞게 해석할 수 있는 것이다.<br>

<br>

정리하면 데이터 타입이 하는 역할은 아래와 같다.

> 1. 값을 저장할 때 확보해야 하는 **메모리 공간의 크기**를 결정하기 위해
> 2. 값을 참조할 때 한 번에 읽어 들여야 하는 **메모리 공간의 크기**를 결정하기 위해
> 3. 메모리에서 읽어 들인 2진수를 **어떻게 해석**할지 결정하기 위해

<br>
<br>

## 6.10.1 동적 타입 언어와 정적 타입 언어
---

C나 JAVA같은 **정적 타입 언어**는 변수를 선언할 때 변수의 데이터 타입을 사전에 명시해야 한다.
```javascript
// c 변수에는 1바이트 정수 타입의 값(-128 ~ 127)만을 할당할 수 있다.
char c;

// num 변수에는 4바이트 정수 타입의 값(-2,124,483,648 ~ 2,124,483,647)만을 할당할 수 있다.
int num;
```

<br>

위와 같은 정적 타입 언어는 사전에 변수 타입을 정해놓는다.<br>
해당 타입에 맞는 값만 할당할 수 있으며 다른 값을 넣게 되면 에러를 발생시킨다.<br>
이와 같은 방법으로 데이터 타입의 일관성을 유지시켜 더욱 안정적인 코드 구현이 가능하게 만든다.<br>

<br>
<br>

반면에 자바스크립트는 정적 타입 언어와 달리 변수를 선언할 때 타입을 명시하지 않는다.<br>
즉, 어떠한 데이터 타입의 값이든 변수에 할당할 수 있다.<br>
이는 좀 더 자유로운 값의 할당이 가능하지만 의도치 않은 값이 변수에 할당될 수 있다는 위험성이 있다.<br>

```javascript
var foo;
console.log(typeof foo);  // undefined

foo = 3;
console.log(typeof foo);  // number

foo = 'Hello';
console.log(typeof foo);  // string

foo = true;
console.log(typeof foo);  // boolean

foo = null;
console.log(typeof foo);  // object

foo = Symbol(); // 심벌
console.log(typeof foo);  // symbol

foo = {}; // 객체
console.log(typeof foo);  // object

foo = []; // 배열
console.log(typeof foo);  // object

foo = function () {}; // 함수
console.log(typeof foo);  // function
```

<br>

자바스크립트와 같이 선언이 아닌 변수 할당에 의해 타입이 결정되는 방식을 **동적 타입 언어**라고 부른다.

<br>
<br>

## 6.10.2 동적 타입 언어와 변수
---
앞 서 말했듯이 JS와 같은 동적 타입 언어는 데이터 값 할당이 매우 편리하지만 위험하다.<br>
변수 값의 타입이 언제든지 변경될 수 있기 때문에 복잡한 프로그램에서 변수 값을 추적하기 어려울 수 있고 값을 확인하기 전에 타입을 확신할 수 없다는 큰 구조적 단점이 존재한다.<br>

<br>

코드는 오해하지 않도록 작성해야 한다.<br>
오해는 커뮤니케이션을 저하시키고 생산성을 떨어뜨린다.<br>
**가독성이 좋은 코드가 좋은 코드임을 명심하자.**