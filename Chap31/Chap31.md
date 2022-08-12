## 정규표현식이란?
---

<br>

`정규 표현식`은 `일정한 패턴을 가진 문자열의 집합`을 표현하기 위해 사용하는 형식 언어이다.  
정규표현식은 언어의 고유 문법이 아닌 대부분 프로그래밍 언어 에디터에 내장되어 있다.  

* `정규 표현식`은 문자열을 대상으로 `패턴 매칭 기능`을 제공한다.

<br>
<br>

**EX) 휴대폰 전화번호 패턴 매칭**

```javascript
// 사용자로부터 입력받은 휴대폰 전화번호
const tel = '010-1234-567팔';

// 정규 표현식 리터럴로 휴대폰 전화번호 패턴을 정의한다.
const regExp = /^\d{3}-\d{4}-\d{4}$/;

// tel이 휴대폰 전화번호 패턴에 매칭하는지 테스트(확인)한다.
regExp.test(tel); // -> false
```

<br>

* 만약 이를 `정규 표현식`을 사용하지 않는다면, 많은 반복문과 조건문이 사용되어 가독성이 매우 떨어진다.


<br>
<br>

## 정규 표현식의 생성
---

<br>

정규 표현식을 생성하기 위해서는 `리터럴`과 `RegEXp 생성자 함수`를 사용할 수 있다.

<br>

**정규 표현식 리터럴 형식**

> 리터럴 형식 : **/[regexp]/i**
> * / : 시작,종료 기호
> * regexp : 패턴
> * i : 플래그

<br>

```javascript
const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // -> true
```

<br>
<br>

* RegExp 생성자 함수를 통해 정규 표현식을 생성할 수 있다.

```javascript
const target = 'Is this all there is?';

const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp('is', 'i');

regexp.test(target); // -> true
```

<br>
<br>
<br>

## RegExp 메서드
---

<br>
<br>

### RegExp.prototype.exec

* 인수로 전달받은 문자열에 대해 정규 표현식 패턴 검색하여 매칭 결과를 배열로 반환한다.

<br>

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

<br>
<br>

### RegExp.prototype.test

* 인수로 전달받은 문자열에 대해 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // -> true
```

<br>
<br>

### String.prototype.match

* 대상 문자열과 인수로 전달받은 정규 표현식과 매칭 결과를 배열로 반환한다.

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

<br>
<br>
<br>

## 플래그
---

플래그는 패턴과 함께 정규 표현식 `검색 방식을 설정`하기 위해 사용된다.

<br>

| 플래그 | 의미 | 설명 |
| --- | --- | --- |
| i | Ignore case | 대소문자를 구별하지 않고 패턴을 검색한다. |
| g | Global | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 검색한다. | 
| m | Multi line | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다. | 

<br>

* 플래그는 옵션이므로 사용하지 않을 수 있으며 여러 개 동시에 사용할 수 있다.

> test 메서드에서는 `g 플래그`를 걸어도 하나만 검색한다.

<br>

```javascript
const target = 'Is this all there is?';

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// -> ["is", "is"]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/ig);
// -> ["Is", "is", "is"]
```

<br>
<br>

## 패턴
---

<br>

* 패턴은 '/'로 열고 닫으며 만주열의 따옴표는 생략한다.
* 특별한 의미를 가지는 메타문자 또는 기호로 다양한 표현이 가능하다.

<br>
<br>

### 임의의 문자열 검색


* `'.'`은 `임의의 문자 한 개`를 의미한다.
* 문자 내용은 무엇이든 상관없으며 여러 개를 붙여서 사용할 수 있다.

```javascript
const target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // -> ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

<br>
<br>

### 반복 검색

* {m,n}은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.  
* 콤마 뒤에 공백이 있으면 제대로 동작하지 않으므로 주의해야 한다.


