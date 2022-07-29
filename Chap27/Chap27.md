## 27.1 배열이란?
---

배열은 여러 개의 값을 순차적으로 나열한 자료구조이다.    

* 배열이 가지고 있는 값을 **요소**라고 부른다. 
* 자바스크립트에서 값으로 인정하는 모든 것이 배열 요소가 될 수 있다.

```javascript
const arr = ['apple', 'banana', 'orange'];
```

<br>
<br>


배열에서는 위치를 나타내는 0 이상의 정수인 **인덱스**를 갖는다.


```javascript
arr[0] // -> 'apple'
arr[1] // -> 'banana'
arr[2] // -> 'orange'
```


<br>
<br>

배열은 요소의 개수, 즉 배열의 길이를 나타내는 **length** 프로퍼티를 갖는다.
```javascript
arr.length // -> 3
```

<br>
<br>

자바스크립트에서 **배열이라는 타입은 존재하지 않는다.**  
배열은 **객체타입**이다.

```javascript
typeof arr // -> object
```

<br>
<br>

배열은 배열 리터럴, Array 생성자 함수, Array.of, Array.from 메서드로 생성할 수 있다.  
배열의 생성자 함수는 Array이며 프로토타입 객체는 Array.prototype이다.  

```javascript
const arr = [1, 2, 3];

arr.constructor === Array // -> true
Object.getPrototypeOf(arr) === Array.prototype // -> true
```

<br>
<br>

> 배열은 객체지만 일반적인 객체와는 구별되는 특징이 있다.

일반 객체와 배열을 구분하는 가장 명확하 차이는 **값의 순서**와 **length 프로퍼티**이다.

|구분|객체|배열|
|:---|:---:|:---:|
|구조| 프로퍼티 키,값 | 인덱스와 요소 |
|값의 참조 | 프로퍼티 키 | 인덱스 |
|값의 순서| X | O |
|length 프로퍼티 | X | O |

<br>
<br>

배열의 장점은 인덱스와 length 프로퍼티를 갖고있기 때문에 순차적으로 요소에 접근할 수 있다는 것이다.

```javascript
const arr = [1, 2, 3];

// 반복문으로 자료 구조를 순서대로 순회하기 위해서는 자료 구조의 요소에 순서대로
// 접근할 수 있어야 하며 자료 구조의 길이를 알 수 있어야 한다.
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3
}
```

<br>
<br>
<br>
<br>

## 27.2 자바스크립트 배열은 배열이 아니다
---

일반적으로 자료구조에서 말하는 "배열"은 동일한 크기의 메모리가 연속적으로 나열된 자료구조이다.  
이러한 구조를 가진 배열을 **밀집 배열**이라고 한다.

<br>

**밀집 배열**은 각 요소가 동일한 데이터 크기를 가지며, 빈틈없이 연속적으로 이어져 있어 `인덱스`를 통해 `임의 접근`을 할 수 있다.  

* 밀집 배열은 매우 효율적이며 빠르다.  
* 단, 선형 검색인 경우 특정 요소를 발견할 때까지 차례대로 검색을 해야한다.

```javascript
// 선형 검색을 통해 배열(array)에 특정 요소(target)가 존재하는지 확인한다.
// 배열에 특정 요소가 존재하면 특정 요소의 인덱스를 반환하고, 존재하지 않으면 -1을 반환한다.
function linearSearch(array, target) {
  const length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] === target) return i;
  }

  return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
```

<br>

또한 **밀집 배열**은 요소를 삽입하거나 삭제하는 경우 연속적으로 메모리 공간을 유지하기 위해 요소를 이동시켜야 하는 단점이 있다.

<br>
<br>

> 그러나 자바스크립트 배열은 일반적인 **밀집 배열**이 아닌 **배열의 동작을 흉내낸 객체**이다.
* 이때 JS 배열은 희소 배열이라는 특수한 배열을 지원한다.
* 희소 배열이란? 메모리 공간이 동일한 크기를 갖고 있지 않아도 되며, 연속적으로 이어져 있지 않을 수 있는 배열

<br>

한마디로 자바스크립트 배열은 일반적인 배열이 아니다.  
자바스크립트 배열은 **일반적인 배열의 동작을 흉내 낸 특수한 객체**일 뿐이다.  

```javascript
// "16.2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체" 참고
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
  '0': {value: 1, writable: true, enumerable: true, configurable: true}
  '1': {value: 2, writable: true, enumerable: true, configurable: true}
  '2': {value: 3, writable: true, enumerable: true, configurable: true}
  length: {value: 3, writable: true, enumerable: false, configurable: false}
}
*/
```

위의 예제에서 볼 수 있듯이 배열은 `인덱스`를 나타내는 문자열을 `프로퍼티 키`로 가지며, length 프로퍼티를 갖는 특수 객체이다.


<br>
<br>

#### 일반적인 배열과 자바스크립트 배열의 장단점

* 일반적인 배열은 인덱스 요소에 빠르게 접근할 수 있지만 요소 삽입, 삭제하는 경우 효율적이지 않다.
* 반면에 자바스크립트 배열은 구조적인 부분때문에 성능은 떨어지지만 삭제, 삽입하는 경우 더 빠르다.

즉, 자바스크립트 배열은 일반적인 배열보다 느릴 수밖에 없는 구조적인 단점을 지니고 있다.  
해당 단점을 보완하기 위해 모던 JS엔진은 좀 더 배열처럼 동작하도록 최적화했다.  
이를 테스트해보면 JS 배열 객체가 일반 객체보다 2배 정도 빠르다는 것을 알 수 있다.

```javascript
const arr = [];

console.time('Array Performance Test');

for (let i = 0; i < 10000000; i++) {
  arr[i] = i;
}
console.timeEnd('Array Performance Test');
// 약 340ms

const obj = {};

console.time('Object Performance Test');

for (let i = 0; i < 10000000; i++) {
  obj[i] = i;
}

console.timeEnd('Object Performance Test');
// 약 600ms
```

<br>
<br>
<br>
<br>

## 27.3 length 프로퍼티와 희소 배열
---

`length` 프로퍼티는 배열의 길이를 나타내는 0 이상의 정수를 갖는다.  
빈 배열이 아닐 경우 가장 큰 인덱스에 1을 더한 것과 같다.  

```javascript
[].length        // -> 0
[1, 2, 3].length // -> 3
```

<br>

`length` 프로퍼티의 값은 0 ~ 2^32 - 1 사이의 양의 정수이다.  
즉, 배열은 요소를 최대 2^32 - 1개 가질 수 있다.  

<br>
<br>

length 프로퍼티 값은 자동으로 갱신이 되지만 임의의 숫자 값을 할당할 수 있다.  
그리고 할당한 숫자 값으로 배열의 크기가 자동적으로 줄어든다.  

```javascript
const arr = [1, 2, 3, 4, 5];

// 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// 배열의 길이가 5에서 3으로 줄어든다.
console.log(arr); // [1, 2, 3]
```

<br>

> 단, 현재 length 프로퍼티 값보다 큰 숫자 값을 할당할 경우 값은 변경되지만 실제 배열의 크기가 늘어나지는 않는다.

```javascript
const arr = [1];

// 현재 length 프로퍼티 값인 1보다 큰 숫자 값 3을 length 프로퍼티에 할당
arr.length = 3;

// length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
console.log(arr.length); // 3
console.log(arr); // [1, empty × 2]
```

<br>
<br>

JS는 **희소 배열**을 지원한다.  
배열의 요소가 메모리 공간에 연속적으로 위치하는 것처럼 보이지만 실제로는 중간이나 앞부분이 비어있을 수 있다.  

* 일반적인 배열은 length와 배열 요소의 개수가 일치하지만 **희소 배열**은 일치하지 않는다.
* JS는 문법적으로 **희소 배열**을 허용하지만 **희소 배열**을 사용하지 않는 것이 좋다.

```javascript
// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(sparse));
/*
{
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/
```

<br>
<br>
<br>
<br>

## 27.4 배열 생성
---

### 배열 리터럴

배열 리터럴은 0개 이상의 요소를 쉼표로 구분하여 대괄호로 묶어서 표현한다.

```javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

<br>
<br>

### Array 생성자 함수

Array 생성자 함수를 통해 배열을 생성할 수 있다.  
이때 전달되는 인수의 개수에 따라 다르게 동작하므로 주의해야 한다.

<br>
<br>

* 전달된 인수가 1개이고 숫자인 경우
```javascript
const arr = new Array(10);

console.log(arr); // [empty × 10]
console.log(arr.length); // 10
```

이때 생성된 배열은 희소 배열로 length는 10이지만 배열 요소는 존재하지 않는다.

<br>
<br>

* 배열 요소 범위를 벗어난 경우 (최대 = 2^32-1개)

```javascript
// 배열은 요소를 최대 4,294,967,295개 가질 수 있다.
new Array(4294967295);

// 전달된 인수가 0 ~ 4,294,967,295를 벗어나면 RangeError가 발생한다.
new Array(4294967296); // RangeError: Invalid array length

// 전달된 인수가 음수이면 에러가 발생한다.
new Array(-1); // RangeError: Invalid array length
```

<br>
<br>

* 전달된 인수가 없는 경우 (빈 배열 생성)

```javascript
new Array(); // -> []
```

<br>
<br>

* 전달된 인수가 2개 이상이거나 숫자가 아닐 경우 (해당 인수를 요소로 갖는 배열 생성)
```javascript
// 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
new Array(1, 2, 3); // -> [1, 2, 3]

// 전달된 인수가 1개지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
new Array({}); // -> [{}]
```

<br>
<br>
<br>

### Array.of

ES6에서 도입된 Array.of 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다.

```javascript
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
Array.of(1); // -> [1]

Array.of(1, 2, 3); // -> [1, 2, 3]

Array.of('string'); // -> ['string']
```

<br>
<br>
<br>

### Array.from

ES6에서 도입된 Array.from 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.

```javascript
// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: 'a', 1: 'b' }); // -> ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
Array.from('Hello'); // -> ['H', 'e', 'l', 'l', 'o']
```

<br>
<br>

Array.from 메서드는 두 번째 인수로 콜백 함수를 받을 수 있다.  
해당 콜백 함수는 첫번째 인수로 전달된 배열의 요소와 인덱스를 전달받아 순차적으로 처리한다.  
이때 콜백 함수의 반환값으로 구성된 배열을 반환한다.

```javascript
// Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
Array.from({ length: 3 }); // -> [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({ length: 3 }, (_, i) => i); // -> [0, 1, 2]
```

<br>
<br>
<br>
<br>

## 27.5 배열 요소의 참조
---

배열 요소를 참조할 때 대괄호 표기법 안에 인덱스를 넣어 참조한다.

```javascript
const arr = [1, 2];

// 인덱스가 0인 요소를 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소를 참조
console.log(arr[1]); // 2
```

<br>

이때 존재하지 않는 요소에 접근하면 undefined를 반환한다.

```javascript
const arr = [1, 2];

// 인덱스가 2인 요소를 참조. 배열 arr에는 인덱스가 2인 요소가 존재하지 않는다.
console.log(arr[2]); // undefined
```

<br>
<br>
<br>

## 27.6 배열 요소의 추가와 갱신
---

배열도 객체에 프로퍼티를 추가하는 것처럼 요소를 동적으로 추가할 수 있다.  
존재하지 인덱스에 값을 할당하는 방식으로 요소를 동적으로 추가한다.  

```javascript
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [0, 1]
console.log(arr.length); // 2
```

<br>

이때 length 프로퍼티 값보다 큰 인덱스에 새로운 요소를 추가하면 희소 배열이 된다.  
이때 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.

```javascript
arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101
```

<br>
<br>

배열에서 값을 갱신하는 방법은 이미 존재하는 요소에 값을 재할당하면 된다.

```javascript
// 요소값의 갱신
arr[1] = 10;

console.log(arr); // [0, 10, empty × 98, 100]
```

<br>
<br>

> JS에서 배열은 `객체`이다.  
> * 따라서 만약 인덱스에 숫자가 아닌 문자를 넣을 경우 요소가 아닌 객체의 프로퍼티가 생성된다.  
> * 이때 추가된 프로퍼티는 length 프로퍼티에 영향을 주지 않는다.

```javascript
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
```

<br>
<br>
<br>

## 27.7 배열 요소의 삭제
---

JS에서 배열은 사실 `객체`이기 때문에 요소를 삭제하기 위해서 `delete 연산자`를 사용할 수 있다.

```javascript
const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1];
console.log(arr); // [1, empty, 3]

// length 프로퍼티에 영향을 주지 않는다. 즉, 희소 배열이 된다.
console.log(arr.length); // 3
```

<br>
<br>

>단, delete 연산자는 요소가 아닌 프로퍼티를 삭제하는 개념이므로 length 프로퍼티에 영향을 주지 않는다.  
> 따라서 delete 연산자는 희소 배열을 생성하므로 사용하지 않는 것이 좋다.  
> 희소 배열을 만들지 않으면서 특정 요소를 제거하기 위해선 `Array.prototype.splice` 메서드를 사용한다.

<br>

```javascript
const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티가 자동 갱신된다.
console.log(arr.length); // 2
```