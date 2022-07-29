## 27.8 배열 메서드
---

JS는 배열에 관련한 유용한 다양한 빌트인 메서드를 제공한다.  
배열 메서드는 결과물을 반환하는 패턴이 크게 2가지가 있다.  

* 원본 배열을 직접 변경하는 메서드  
* 원본 배열을 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드  

```javascript
const arr = [1];

// push 메서드는 원본 배열(arr)을 직접 변경한다.
arr.push(2);
console.log(arr); // [1, 2]

// concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환한다.
const result = arr.concat(3);
console.log(arr);    // [1, 2]
console.log(result); // [1, 2, 3]
```

<br>
<br>

### Array.isArray

Array.isArray는 전달된 인수가 배열이면 true, 아니면 false를 반환한다.

```javascript
// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ 0: 1, length: 1 })
```

<br>
<br>
<br>

### Array.prototype.indexof

indexOf 메서드는 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.

* 이때, 중복된 요소가 여러 개가 있다면 첫번째로 검색된 요소 인덱스를 반환한다.
* 존재하지 않으면 -1을 반환한다.

```javascript
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환한다.
arr.indexOf(2);    // -> 1
// 배열 arr에 요소 4가 없으므로 -1을 반환한다.
arr.indexOf(4);    // -> -1
// 두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // -> 2
```

<br>
<br>

> `indexOf` 메서드 대신에 ES7에서 도입된 includes 메서드를 사용하면 가독성이 좋다.

```javascript
const foods = ['apple', 'banana'];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (!foods.includes('orange')) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]
```

<br>
<br>
<br>

### Array.prototype.push

push 메서드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가한다.  
그리고 변경된 length 프로퍼티 값을 반환한다.

* push 메서드는 성능 면에서 좋지 않다.
* 따라서 length 프로퍼티를 이용해서 배열의 마지막 요소에 직접 추가할 수 있는데 해당 방법이 push 메서드보다 빠르다.

```javascript
const arr = [1, 2];

// arr.push(3)과 동일한 처리를 한다. 이 방법이 push 메서드보다 빠르다.
arr[arr.length] = 3;
console.log(arr); // [1, 2, 3]
```

<br>
<br>

> push 메서드는 원본 배열을 직접 변경하므로 예기치않은 부수 효과가 발생할 위험이 존재한다.  
> 따라서 스프레드 문법을 통해 부수 효과를 방지않는 것이 좋다.

```javascript
const arr = [1, 2];

// ES6 스프레드 문법
const newArr = [...arr, 3];
console.log(newArr); // [1, 2, 3]
```

<br>
<br>
<br>

### Array.prototype.pop

pop 메서드는 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.  
이때 원본 배열이 빈 배열이면 `undefined`를 반환한다.

```javascript
const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.pop();
console.log(result); // 2

// pop 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1]
```

<br>
<br>
<br>

### Array.prototype.unshift

unshift 메서드는 인수로 전달받은 모든 값을 원본 배열 선두에 요소로 추가한다.  
그리고 변겨오딘 length 프로퍼티 값을 반환한다.  

```javascript
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.unshift(3, 4);
console.log(result); // 4

// unshift 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 4, 1, 2]
```

<br>

> unshift 메서드도 원본 배열을 변경하는 부수 효과가 있으므로 스프레드 문법을 활용하면 좋다.

```javascript
const arr = [1, 2];

// ES6 스프레드 문법
const newArr = [3, ...arr];
console.log(newArr); // [3, 1, 2]
```

<br>
<br>
<br>

### Array.prototype.shift

shift 메서드는 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.  
원본 배열이 빈 배열이면 `undefined`를 반환한다.

```javascript
const arr = [1, 2];

// 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.shift();
console.log(result); // 1

// shift 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [2]
```

<br>
<br>
<br>

### Array.prototype.concat

concat 메서드는 인수로 전달된 값들을 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
// 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다.
let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(3);
console.log(result); // [1, 2, 3]

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 변경되지 않는다.
console.log(arr1); // [1, 2]
```

<br>
<br>

concat 메서드는 ES6의 `스프레드 문법`으로 대체할 수 있다.

```javascript
let result = [1, 2].concat([3, 4]);
console.log(result); // [1, 2, 3, 4]

// concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있다.
result = [...[1, 2], ...[3, 4]];
console.log(result); // [1, 2, 3, 4]
```

<br>

> 결론적으로, push/unshift 메서드와 concat 메서드를 사용하는 대신에 ES6의 `스프레드 문법`을 일관성 있게 쓰는 것을 권장한다.

<br>
<br>
<br>

### Array.prototype.splice

splice 메서드는 원본 배열 중간에 요소를 추가하거나 중간에 있는 요소를 제거할 때 사용한다.  
splice 메서드는 3개의 매개변수가 있으면 원본 배열을 직접 변경한다.  

* start : 원본 배열 요소를 제거하기 시작할 인덱스
* deleteCount : start부터 제거할 요소의 개수
* items : 제거한 위치에 삽입할 요소의 목록

```javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입한다.
const result = arr.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]
// splice 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 20, 30, 4]
```

<br>
<br>
<br>

### Array.prototype.slice

slice 메서드는 인수로 전달받은 범위의 요소들을 복사하여 배열로 반환한다. 이때 원본 배열은 변경되지 않는다.  
slice 메서드는 두 개의 매개변수를 갖는다.  

* start : 복사를 시작할 인덱스
* end : 복사를 종료할 인덱스, 이 인덱스에 해당하는 요소는 복사되지 않는다.

<br>

```javascript
const arr = [1, 2, 3];

// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환한다.
arr.slice(0, 1); // -> [1]

// arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환한다.
arr.slice(1, 2); // -> [2]

// 원본은 변경되지 않는다.
console.log(arr); // [1, 2, 3]
```

<br>
<br>


slice 메서드의 모든 인수를 생략할 수 있는데 이때는 원본 배열의 복사본이 반환된다. (얕은 복사)

```javascript
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

// 얕은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos];

// _todos와 todos는 참조값이 다른 별개의 객체다.
console.log(_todos === todos); // false

// 배열 요소의 참조값이 같다. 즉, 얕은 복사되었다.
console.log(_todos[0] === todos[0]); // true
```

> 얕은 복사 : 객체의 참조 값은 다르지만 객체에 중첩되어 있는 객체는 참조 값이 같다.
> 깊은 복사 : 모든 참조 값이 다르다.

<br>
<br>
<br>

### Array.prototype.join

join 메서드는 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 구분자로 연결한 문자열을 반환한다.  
구분자는 생략이 가능하며 기본 구분자는 `콤마(,)`이다.

```javascript
const arr = [1, 2, 3, 4];

// 기본 구분자는 ','이다.
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환한다.
arr.join(); // -> '1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환한다.
arr.join(''); // -> '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환한다.ㄴ
arr.join(':'); // -> '1:2:3:4'
```

<br>
<br>
<br>

### Array.prototype.reverse

reverse 메서드는 원본 배열의 순서를 반대로 뒤집는다. 이때 원본 배열이 변경된다.  
반환값은 변경된 배열이다.

```javascript
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 2, 1]
// 반환값은 변경된 배열이다.
console.log(result); // [3, 2, 1]
```

<br>
<br>
<br>


### Array.prototype.fill

ES6에서 도입된 fill 메서드는 인수로 전달받은 값으로 배열을 채운다.

```javascript
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0을 배열의 처음부터 끝까지 요소로 채운다.
arr.fill(0);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [0, 0, 0]
```

<br>

* 두 번째 인수로 채우기 시작할 인덱스를 전달할 수 있다.

```javascript
const arr = [1, 2, 3];

// 인수로 전달받은 값 0을 배열의 인덱스 1부터 끝까지 요소로 채운다.
arr.fill(0, 1);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0]
```

<br>

* 세 번째 인수로 멈출 인덱스를 전달할 수 있다.

```javascript
const arr = [1, 2, 3, 4, 5];

// 인수로 전달받은 값 0을 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 요소로 채운다.
arr.fill(0, 1, 3);

// fill 메서드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0, 4, 5]
```

<br>
<br>

`fill` 메서드는 하나의 값으로 요소를 채울 수밖에 없다는 단점이 존재한다.  
하지만 `Array.from` 메서드를 이용하면 두 번째 인수인 콜백 함수를 통해 요소값을 만들면서 배열을 채울 수 있다.

```javascript
// 인수로 전달받은 정수만큼 요소를 생성하고 0부터 1씩 증가하면서 요소를 채운다.
const sequences = (length = 0) => Array.from({ length }, (_, i) => i);
// const sequences = (length = 0) => Array.from(new Array(length), (_, i) => i);

console.log(sequences(3)); // [0, 1, 2]
```

<br>
<br>
<br>

### Array.prototype.includes

ES7에서 도입된 includes 메서드는 배열 내에 특정 요소가 포함되어 있으면 true 없으면 false를 반환한다.

* 첫 번째 인수로 검색할 대상을 지정한다.
* 두 번째 인수로 검색을 시작할 인덱스를 전달할 수 있다. (생략하면 0번 인덱스부터)

```javascript
const arr = [1, 2, 3];

// 배열에 요소 1이 포함되어 있는지 인덱스 1부터 확인한다.
arr.includes(1, 1); // -> false

// 배열에 요소 3이 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인한다.
arr.includes(3, -1); // -> true
```

<br>
<br>
<br>

### Array.prototype.flat

ES10에서 도입된 flat 메서드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다.  

```javascript
[1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]
```

<br>
<br>

평탄화할 깊이를 인수로 전달할 수 있다.  
인수를 생략할 경우 기본값은 1이고 인수로 Infinity를 전달받으면 중첨 배열을 모두 평탄화한다.  

```javascript
// 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1이다.
[1, [2, [3, [4]]]].flat();  // -> [1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(1); // -> [1, 2, [3, [4]]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 2로 지정하여 2단계 깊이까지 평탄화한다.
[1, [2, [3, [4]]]].flat(2); // -> [1, 2, 3, [4]]
// 2번 평탄화한 것과 동일하다.
[1, [2, [3, [4]]]].flat().flat(); // -> [1, 2, 3, [4]]

// 중첩 배열을 평탄화하기 위한 깊이 값을 Infinity로 지정하여 중첩 배열 모두를 평탄화한다.
[1, [2, [3, [4]]]].flat(Infinity); // -> [1, 2, 3, 4]
```

<br>
<br>
<br>
<br>

## 27.9 배열 고차 함수
---

`고차 함수`란 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다.  
`고차 함수`는 외부 상태의 변경이나 가변 데이터를 피하고 `불변성`을 지향하는 함수형 프로그래밍에 기반을 두고 있다.  

> **함수형 프로그래밍이란?**
> * 함수의 조합을 통해 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하는 프로그래밍 패러다임이다.

<br>

JS에서는 고차 함수를 다수 지원한다.  
특히 배열에 관련된 유용한 고차 함수를 제공하고 활용도가 매우 높으므로 잘 이해해야 한다.  

<br>
<br>
<br>

### Array.prototype.sort

sort 메서드는 배열의 요소를 정렬한다. 원본 배열을 직접 변경한다.  
정렬된 배열을 반환한다.

<br>

* 기본적으로 오름차순으로 요소를 정렬한다.

```javascript
const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']
```

<br>
<br>

* 숫자로 이루어진 배열을 sort 메서드로 정렬할 때 주의해야 한다.
  
```javascript
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();

// 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
console.log(points); // [1, 10, 100, 2, 25, 40, 5]
```

<br>

sort 메서드는 `유니코드 코드 포인트` 순서를 따른다.  
따라서 배열의 요소가 숫자 타입이면 일시적으로 문자열로 변환한 후 `유니코드 코드 포인트` 순서로 정렬한다.  
이때 숫자의 순서와 문자열로 변환한 `유니코드 코드 포인트`가 다른 경우가 존재하여 제대로 정렬이 되지 않는 경우가 발생한다.  

<br>

> 따라서 숫자 요소를 정렬할 때는 sort 메서드에 **정렬 순서를 정의하는 비교 함수**를 인수로 전달해야 한다.

* 비교 함수 반환값이 0보다 크면, 첫번째 인수로 정렬
* 비교 함수 반환값이 0이면, 정렬하지 않음
* 비교 함수 반환값이 0보다 작으면, 두번째 인수로 정렬

<br>

```javascript
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬한다.
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소/최대값 취득
console.log(points[0], points[points.length]); // 1

// 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬한다.
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100`
```

<br>
<br>
<br>

### Array.prototype.forEach


함수형 프로그래밍 패러다임에서는 최대한 조건문과 반복문을 제거하여 복잡성을 줄여야 한다.  
따라서 for 문을 사용하는 것을 최대한 피하고 forEach를 대체하는 것이 바람직하다.  

<br>

forEach 메서드는 for문을 대체할 수 있는 고차함수로서 자신 내부에서 반복문을 실행한다.  
이때 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다.

```javascript
const numbers = [1, 2, 3];
let pows = [];

// forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
numbers.forEach(item => pows.push(item ** 2));
console.log(pows); // [1, 4, 9]
```

<br>
<br>

* 이때 forEach는 콜백 함수를 호출할 때 요소 값, 인덱스, 호출한 배열(this) 3개의 인수를 순차적으로 전달한다. 

```javascript
// forEach 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].forEach((item, index, arr) => {
  console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/
```

<br>

* forEach의 반환값은 언제나 undefined이다.

```javascript
const result = [1, 2, 3].forEach(console.log);
console.log(result); // undefined
```

<br>

* 콜백 함수의 내부의 this는 undefined를 가리킨다.
* 따라서 this를 외부 함수와 일치시키고 싶으면 두 번째 인수로 this로 사용할 객체를 전달하면 된다.

```javascript
class Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(function (item) {
      this.numberArray.push(item * item);
    }, this); // forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

<br>

> 더 나은 방법은 ES6의 화살표 함수를 이용하는 것이다.  
> 화살표 함수는 자체적인 this가 존재하지 않으므로 상위의 this를 참조하므로 this를 일치시킬 수 있다.

```javascript
class Numbers {
  numberArray = [];

  multiply(arr) {
    // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
    arr.forEach(item => this.numberArray.push(item * item));
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

<br>

* forEach 메서드는 for문과 달리 break, continue 문을 사용할 수 없다.

```javascript
[1, 2, 3].forEach(item => {
  console.log(item);
  if (item > 1) break; // SyntaxError: Illegal break statement
});

[1, 2, 3].forEach(item => {
  console.log(item);
  if (item > 1) continue;
  // SyntaxError: Illegal continue statement: no surrounding iteration statement
});
```

<br>
<br>
<br>

### Array.prototype.map

map 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 전달받은 콜백 함수를 반복 호출한다.  
이때 **콜백 함수의 반환값들로 구성된 새로운 배열**을 반환한다.  

```javascript
const numbers = [1, 4, 9];

// map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
const roots = numbers.map(item => Math.sqrt(item));

// 위 코드는 다음과 같다.
// const roots = numbers.map(Math.sqrt);

// map 메서드는 새로운 배열을 반환한다
console.log(roots);   // [ 1, 2, 3 ]
// map 메서드는 원본 배열을 변경하지 않는다
console.log(numbers); // [ 1, 4, 9 ]
```

<br>

forEach 메서드는 단순히 반복문을 대체하기 위한 고차 함수인 반면에 map 메서드는 요소값을 다른 값으로 매핑하기 위한 고차함수이다.  


> 따라서 map 메서드는 1:1 매핑을 통해 요소값을 새로운 값으로 대체한다.  
> 즉, 반한된 배열의 length 프로퍼티 값과 호출한 배열의 length 프로퍼티 값은 반드시 일치한다.  
> 그 외 부분은 forEach문과 전부 동일한다.

<br>
<br>
<br>

### Array.prototype.filter

filter 메서드는 자신을 호출한 배열의 순회하면서 **콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열**을 반환한다.

```javascript
const numbers = [1, 2, 3, 4, 5];

// filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
// 다음의 경우 numbers 배열에서 홀수인 요소만을 필터링한다(1은 true로 평가된다).
const odds = numbers.filter(item => item % 2);
console.log(odds); // [1, 3, 5]
```

<br>

filter 메서드는 특정 배열에서 필터링 조건을 만족하는 특정 요소만 추출하고 싶을 때 사용한다.  
이때 filter 메서드가 생성한 배열은 호출한 배열의 length 프로퍼티 값보다 반드시 같거나 작다.

<br>
<br>

filter 메서드는 특정 요소를 제거하기 위해 사용할 수도 있다.

```javascript
class Users {
  constructor() {
    this.users = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' }
    ];
  }

  // 요소 추출
  findById(id) {
    // id가 일치하는 사용자만 반환한다.
    return this.users.filter(user => user.id === id);
  }

  // 요소 제거
  remove(id) {
    // id가 일치하지 않는 사용자를 제거한다.
    this.users = this.users.filter(user => user.id !== id);
  }
}

const users = new Users();

let user = users.findById(1);
console.log(user); // [{ id: 1, name: 'Lee' }]

// id가 1인 사용자를 제거한다.
users.remove(1);

user = users.findById(1);
console.log(user); // []
```

<br>
<br>
<br>

### Array.prototype.reduce

reduce 메서드는 배열을 순회하면서 콜백 함수의 반환값을 다음 순회 시에 첫 번째 인수로 전달하면서 콜백 함수를 호출하여 **하나의 결과값을 만들어 반환한다.**  

* 첫 번째 인수로 콜백 함수 전달받는다.
* 두 번째 인수로 초기값을 전달받는다.
* reduce 콜백 함수는 `초기값 또는 콜백 함수 이전 반환 값` , `요소값`, `인덱스`, `this` 총 4개의 인수를 받을 수 있다.
  
```javascript
// [1, 2, 3, 4]의 모든 요소의 누적을 구한다.
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

console.log(sum); // 10
```

<br>

reduce 메서드는 배열을 순회하면서 하나의 결과값을 구해야 하는 경우에 유용하게 사용된다.  
reduce 다양한 활용 예시를 살펴보자.  

<br>
<br>

**평균 구하기**

```javascript
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, { length }) => {
  // 마지막 순회가 아니면 누적값을 반환하고 마지막 순회면 누적값으로 평균을 구해 반환한다.
  return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average); // 3.5
```

<br>
<br>

**최대값 구하기**
```javascript
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max); // 5
```

<br>
<br>

**중복 횟수 구하기**
```javascript
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc, cur) => {
  // 첫 번째 순회 시 acc는 초기값인 {}이고 cur은 첫 번째 요소인 'banana'다.
  // 초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로
  // 할당한다. 만약 프로퍼티 값이 undefined(처음 등장하는 요소)이면 프로퍼티 값을 1로 초기화한다.
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

// 콜백 함수는 총 5번 호출되고 다음과 같이 결과값을 반환한다.
/*
{banana: 1} => {banana: 1, apple: 1} => {banana: 1, apple: 1, orange: 1}
=> {banana: 1, apple: 1, orange: 2} => {banana: 1, apple: 2, orange: 2}
*/

console.log(count); // { banana: 1, apple: 2, orange: 2 }
```

<br>
<br>

**중복 배열 평탄화**
```javascript
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
// [1] => [1, 2, 3] => [1, 2, 3, 4] => [1, 2, 3, 4, 5, 6]

console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

<br>
<br>

**중복 요소 제거**
```javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce(
  (unique, val, i, _values) =>
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소다.
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 다르다면 val은 중복된 요소다.
    // 처음 순회하는 요소만 초기값 []가 전달된 unique 배열에 담아 반환하면 중복된 요소는 제거된다.
    _values.indexOf(val) === i ? [...unique, val] : unique,
  []
);

console.log(result); // [1, 2, 3, 5, 4]
```

<br>
<br>
<br>


### Array.prototype.some

some 메서드는 배열을 순회하면서 콜백 함수의 반환값이 한번이라도 참이면 true, 아니면 false를 반환한다.  
즉, 배열의 요소 중 하나라도 콜백 함수에서 정의한 조건을 만족하는지 안 하는지를 확인하는 메서드이다.  

```javascript
// 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item > 10); // -> true

// 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item < 0); // -> false

// 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
['apple', 'banana', 'mango'].some(item => item === 'banana'); // -> true

// some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
[].some(item => item > 3); // -> false
```

<br>
<br>
<br>

### Array.prototype.every

every 메서드는 배열을 순회하면서 콜백 함수의 반환값이 모두 참이면 true, 아니면 false를 반환한다.  
빈 배열일 경우 언제나 true를 반환한다.  

<br>

every 메서드는 모든 요소가 콜백 함수에서 정의한 조건을 만족하는지 확인하는 메서드이다.

```javascript
// 배열의 모든 요소가 3보다 큰지 확인
[5, 10, 15].every(item => item > 3); // -> true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every(item => item > 10); // -> false

// every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
[].every(item => item > 3); // -> true
```

<br>
<br>
<br>

### Array.prototype.find

ES6에서 도입된 find 메서드는 배열을 순회하면서 콜백 함수 반환값이 true인 첫번째 요소를 반환한다.   
만약 반환값이 true인 요소가 존재하지 않는다면 undefined를 반환한다.  

```javascript
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
users.find(user => user.id === 2); // -> {id: 2, name: 'Kim'}
```

<br>
<br>
<br>

### Array.prototype.findIndex

findIndex 메서드는 배열을 순회하면서 콜백 함수 반환값이 true인 첫번째 요소의 인덱스를 반환한다.    
만약 반환값이 true인 요소가 존재하지 않는다면 -1를 반환한다.  

```javascript
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(user => user.id === 2); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(user => user.name === 'Park'); // -> 3

// 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
// 다음과 같이 콜백 함수를 추상화할 수 있다.
function predicate(key, value) {
  // key와 value를 기억하는 클로저를 반환
  return item => item[key] === value;
}

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(predicate('id', 2)); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(predicate('name', 'Park')); // -> 3
```

<br>
<br>
<br>

### Array.prototype.flatMap

flatMap 메서드는 map 메서드를 통해 생성된 새로운 배열을 평탄화하여 반환한다.    
즉, map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있다.  

```javascript
const arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
arr.map(x => x.split('')).flat();
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap(x => x.split(''));
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

> 단, flatMap 메서드는 평탄화 깊이를 지정할 수 없고 1단계만 평탄화한다.