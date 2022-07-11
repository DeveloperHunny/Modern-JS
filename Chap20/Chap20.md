## 20.1 strict mode란?
---

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

위의 코드를 보면 전역 스코프에서 x 변수 선언을 찾을 것이고, 해당 선언이 없으므로 ReferenceError가 발생할 것처럼 보인다.<br>
하지만 javascript에선 전역 객체에 x 프로퍼티를 암묵적으로 생성한다. 이를 **암묵적 전역**이라고 부른다. <br>
이와 같은 javascript 동작은 의도치 않은 전역 변수 생성을 하여 오류를 발생시킬 수 있다. <br>

이러한 javascript 엔진의 유연한 동작은 의도치 않은 오류를 발생시키기 쉽기에 ES5부터 **strict mode**를 통해 좀 더 엄격한 문법을 적용시켜 이를 예방할 수 있다. <br>

<br>

> ESLint과 같은 정적 분석 도구를 통해 비슷한 효과를 볼 수 있다.<br> 
해당 도구는 문법적 오류만이 아닌 코딩 컨벤션도 강제할 수 있기에 strict mode보다 ESLint를 추천한다.

<br>
<br>

## 20.2 strict mode의 적용
---

strict mode를 사용하려면 'use strict'를 적용하고 싶은 코드 선두에 추가하면 된다.

```javascript
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

<br>

코드의 선두에 위치하지 않으면 제대로 동작하지 않는다.
```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  'use strict';
}
foo();
```

<br>
<br>

## 20.3 전역에 strict mode를 적용하는 것을 피하자
---

전역에 적용한 strict mode는 script 단위로 영향을 끼친다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```

<br>

strict mode와 non-strict mode를 혼용해서 사용하는 것은 오류를 발생시킬 수 있다.
특히 외부 라이브러리를 사용할 때 해당 라이브러리가 non-strict mode인 경우 오래가 발생할 가능성이 크다.

<br>
<br>

## 20.5 strict mode가 발생시키는 에러
---

> 1. 암묵적 전역

선언하지 않은 변수를 참조하면 Reference Error를 발생시킨다.

```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

<br>

> 2. 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError를 발생시킨다.

```javascript
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

> 3. 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 SyntaxError를 발생시킨다.

```javascript
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```

> 4. with 문의 사용

with 문을 사용하면 SyntaxError를 발생시킨다.<br>
with문은 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있으므로 권장하지 않는다.

```javascript
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```

<br>
<br>

## 20.6 strict mode 적용에 의한 변화
---

strict mode에서 함수를 일반 함수로 호출할 시 this에 undefined를 바인딩한다.<br>
일반 함수에서는 this를 사용할 필요가 없기 때문이다. 이때는 에러가 발생하지는 않는다.<br>

```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```

<br>
<br>

strict mode에서는 매개변수에 전달된 인수를 변경해도 arguments 객체에 반영되지 않는다.
```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```