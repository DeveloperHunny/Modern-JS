## Set
---

Set 객체는 **중복되지 않는 유일한 값들의 집합**이다.  
Set 객체는 배열과 유사하지만 다음과 같은 차이가 존재한다.  

<br>

| 구분 | 배열 | Set |
| --- | :---: | :---: |
| 동일한 값을 중복하여 포함할 수 있다. | O | X |
| 요소 순서에 의미가 있다. |  O | X |
| 인덱스로 요소에 접근할 수 있다. | O | X |

<br>
<br>

### Set 객체 생성

* Set 객체는 생성자 함수로 생성한다.
* 이때 인수를 전달하지 않으면 빈 Set 객체가 생성된다.

```javascript
const set = new Set();
console.log(set); // Set(0) {}
```

<br>
<br>

* Set 생성자 함수는 `이터러블`을 인수로 받아 Set 객체를 생성한다.
* **이때 중복된 값은 저장되지 않는다.**

```javascript
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {"h", "e", "l", "o"}
```

<br>
<br>
<br>

### 요소 추가

* Set.prototype.add 메서드를 이용해 요소를 추가한다.
* 이때 중복된 요소는 추가되지 않고 무시된다. ( 에러 발생 x )
* add 메서드를 중첩하여 사용하는 것도 가능하다.

```javascript
const set = new Set();

set.add(1).add(2).add(2);
console.log(set); // Set(2) {1, 2}
```

<br>
<br>
<br>

### 요소 존재 여부 확인

* Set.prototype.has 메서드를 이용해 요소 존재 여부를 확인한다.

```javascript
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

<br>
<br>

### 요소 삭제

* Set.prototype.delete 메서드를 사용하여 요소를 삭제할 수 있다.
* 반환 값으로 성공 여부를 나타내는 불리언 값을 반환한다.
* 이때 인덱스가 아닌 요소값을 인수로 전달해야 한다. ( 해당 요소가 존재하지 않더라도 에러가 발생하지 않는다.)

```javascript
const set = new Set([1, 2, 3]);

// 요소 2를 삭제한다.
set.delete(2);
console.log(set); // Set(2) {1, 3}

// 요소 1을 삭제한다.
set.delete(1);
console.log(set); // Set(1) {3}
```


### 요소 순회

Set 객체는 forEach 메서드를 통해 순회할 수 있다.  
이때 다음 3개의 인수를 전달받을 수 있다.

* 첫 번째 인수 : 현재 순회 중인 요소 값
* 두 번째 인수 : 현재 순회 중인 요소 값
* 세 번째 인수 : 순회중인 Set 객체

> 이때, 첫 번째 인수와 두 번째 인수는 같은 값이다.  
> 이는 forEach 인터페이스를 통일시키기 위함으로 그 외 다른 의미는 없다.

<br>

```javascript
const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```

<br>
<br>
<br>
<br>

## 집합 연산
---

Set 객체는 수학적 집합을 구현하기 위한 자료구조이다.  
따라서 Set 객체를 통해 교집합, 합집합, 차집합 등을 구현할 수 있다.  

<br>
<br>

### 교집합

집홥 A와 집합 B의 공통 요소로 구성된 집합이다.  
다음과 같은 방법으로 구현할 수 있다.

```javascript
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    // 2개의 set의 요소가 공통되는 요소이면 교집합의 대상이다.
    if (this.has(value)) result.add(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
// setB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) {2, 4}
```

<br>
<br>

### 합집합

집합 A와 집합 B의 중복 없는 모든 요소로 구성된다.  
다음과 같은 방법으로 구현할 수 있다.  

```javascript
Set.prototype.union = function (set) {
  // this(Set 객체)를 복사
  const result = new Set(this);

  for (const value of set) {
    // 합집합은 2개의 Set 객체의 모든 요소로 구성된 집합이다. 중복된 요소는 포함되지 않는다.
    result.add(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 합집합
console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
// setB와 setA의 합집합
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
```

<br>
<br>

### 차집합

집합 A에는 존재하지만 집합 B에 존재하지 않는 요소로 구성된다.  
다음과 같은 방법으로 구현할 수 있다.  

```javascript
Set.prototype.difference = function (set) {
  // this(Set 객체)를 복사
  const result = new Set(this);

  for (const value of set) {
    // 차집합은 어느 한쪽 집합에는 존재하지만 다른 한쪽 집합에는 존재하지 않는 요소로 구성된 집합이다.
    result.delete(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA에 대한 setB의 차집합
console.log(setA.difference(setB)); // Set(2) {1, 3}
// setB에 대한 setA의 차집합
console.log(setB.difference(setA)); // Set(0) {}
```

<br>
<br>

### 부분집합

집합 A가 집합 B에 포함되는 경우 집합 A는 집합 B의 부분집합이라고 한다.  
다음과 같은 방법으로 부분 집합을 확인할 수 있다.  

```javascript
// this가 subset의 상위 집합인지 확인한다.
Set.prototype.isSuperset = function (subset) {
  for (const value of subset) {
    // superset의 모든 요소가 subset의 모든 요소를 포함하는지 확인
    if (!this.has(value)) return false;
  }

  return true;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA가 setB의 상위 집합인지 확인한다.
console.log(setA.isSuperset(setB)); // true
// setB가 setA의 상위 집합인지 확인한다.
console.log(setB.isSuperset(setA)); // false
```

<br>
<br>
<br>
<br>

## Map
---
Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.  
Map 객체는 `일반 객체`와 유사하지만 다음과 같은 차이점이 있다.

<br>

| 구분 | 객체 | Map 객체 |
| --- | --- | --- |
| 키로 사용할 수 있는 값 | 문자열 또는 심벌 값 | 객체를 포함한 모든 값 |
| 이터러블 | X | O |
| 요소 개수 확인 | Object.keys(obj).length | map.size | 

<br>
<br>
<br>

### Map 객체 생성

* Map 생성자 함수를 통해 생성한다.  
* 인수가 전달되지 않으면 빈 Map 객체가 생성된다.

```javascript
const map = new Map();
console.log(map); // Map(0) {}
```

<br>
<br>

* 이터러블을 인수로 전달받아 Map 객체를 생성할 수 있다.
* **이때 전달되는 이터러블은 키와 값의 쌍으로 구성되어야 한다.**

```javascript
const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}

const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object
```

<br>
<br>

### 요소 추가 

* Map 객체에 요소를 추가할 때는 Map.prototype.set 메서드를 사용한다.  
  
```javascript
const map = new Map();
console.log(map); // Map(0) {}

map.set('key1', 'value1');
console.log(map); // Map(1) {"key1" => "value1"}
```

<br>
<br>

### 요소 취득

* get 메서드는 인수로 전달한 키를 갖는 값을 반환한다.

```javascript
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map
  .set(lee, 'developer')
  .set(kim, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined
```


<br>
<br>

### 요소 삭제

* delete 메서드를 이용해 요소를 삭제할 수 있다.
* 이때 반환 값은 불리언 값이다.

```javascript
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.delete(kim);
console.log(map); // Map(1) { {name: "Lee"} => "developer" }
```

<br>
<br>

### 요소 순회

forEach 메서드를 사용해 요소를 순회할 수 있다.

* 첫 번째 인수 : 현재 순회 중인 요소값
* 두 번째 인수 : 현재 순회 중인 요소키
* 세 번째 인수 : 현재 순회 중인 Map 객체

```javascript
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.forEach((v, k, map) => console.log(v, k, map));
/*
developer {name: "Lee"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
designer {name: "Kim"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
*/
```