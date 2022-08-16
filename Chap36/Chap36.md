### 배열 디스트럭처링 할당

ES6의 `배열 디스트럭처링 할당`은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당한다.

<br>

```javascript
const arr = [1, 2, 3];

// ES6 배열 디스트럭처링 할당
// 변수 one, two, three를 선언하고 배열 arr을 디스트럭처링하여 할당한다.
// 이때 할당 기준은 배열의 인덱스다.
const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

<br>
<br>

* 이때 우변에 이터러블 할당되어야 한다. 만약 이터러블이 아닌 다른 것이 할당되면 에러가 발생한다.


```javascript
const [x, y]; // SyntaxError: Missing initializer in destructuring declaration

const [a, b] = {}; // TypeError: {} is not iterable
```

<br>
<br>

* 배열 디스트럭처링 할당의 기준은 `배열의 인덱스`이다.  
* 즉, 순서대로 할당된다.

> 순서대로 할당되긴 하지만 변수의 개수와 이터러블 요소의 개수가 일치할 필요는 없다.


```javascript
const [a, b] = [1, 2];
console.log(a, b); // 1 2

const [c, d] = [1];
console.log(c, d); // 1 undefined

const [e, f] = [1, 2, 3];
console.log(e, f); // 1 2

const [g, , h] = [1, 2, 3];
console.log(g, h); // 1 3
```

<br>
<br>

* 배열 디스트럭처링 할당에 `Rest 파라미터`와 유사하게 `Rest 요소(...)`를 사용할 수 있다.
* `Rest 요소`는 반드시 마지막에 위치해야 한다.

```javascript
// Rest 요소
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [ 2, 3 ]
```

<br>
<br>
<br>
<br>

### 객체 디스트럭처링 할당

객체를 디스트럭처링하여 변수에 할당하기 위해서는 `프로퍼티 키`를 사용해야 한다.

```javascript
// ES5
var user = { firstName: 'Ungmo', lastName: 'Lee' };

var firstName = user.firstName;
var lastName  = user.lastName;

console.log(firstName, lastName); // Ungmo Lee
```

<br>
<br>

* 객체 디스트럭처링 할당 기준은 `프로퍼티 키`이댜.
* 따라서 배열 디스트럭처링 할당과는 달리 순서와 상관없다.

```javascript
const user = { firstName: 'Ungmo', lastName: 'Lee' };

// ES6 객체 디스트럭처링 할당
// 변수 lastName, firstName을 선언하고 user 객체를 디스트럭처링하여 할당한다.
// 이때 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다. 순서는 의미가 없다.
const { lastName, firstName } = user;

console.log(firstName, lastName); // Ungmo Lee
```

<br>
<br>

* 만약 프로퍼티 키와 다른 이름으로 변수에 할당하고 싶으면 다음과 같이 할당을 하면 된다.

```javascript
const user = { firstName: 'Ungmo', lastName: 'Lee' };

// 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다.
// 프로퍼티 키가 lastName인 프로퍼티 값을 ln에 할당하고,
// 프로퍼티 키가 firstName인 프로퍼티 값을 fn에 할당한다.
const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Ungmo Lee
```

<br>
<br>

* 객체 디스트럭처링 할당은 객체를 인수로 전달받는 함수의 매개변수에도 사용할 수 있다.
* 해당 방법은 객체를 그대로 이용하는 것보다 가독성이 좋아서 권장된다.

```javascript
function printTodo({ content, completed }) {
  console.log(`할일 ${content}은 ${completed ? '완료' : '비완료'} 상태입니다.`);
}

printTodo({ id: 1, content: 'HTML', completed: true });
// 할일 HTML은 완료 상태입니다.
```