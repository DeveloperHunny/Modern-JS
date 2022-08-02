### Math.PI

원주율 PI 값을 반환한다.

```javascript
Math.PI; // -> 3.141592653589793
```

<br>
<br>

## Math 메서드
---

### Math.abs

인수로 전달된 숫자의 `절댓값`을 반환한다.

```javascript
Math.abs(-1);        // -> 1
Math.abs('-1');      // -> 1
Math.abs('');        // -> 0
Math.abs([]);        // -> 0
Math.abs(null);      // -> 0
Math.abs(undefined); // -> NaN
Math.abs({});        // -> NaN
Math.abs('string');  // -> NaN
Math.abs();          // -> NaN
```

<br>
<br>

### Math.round

인수로 전달된 숫자의 `소수점 이하를 반올림한 정수`를 반환한다.

```javascript
Math.round(1.4);  // -> 1
Math.round(1.6);  // -> 2
Math.round(-1.4); // -> -1
Math.round(-1.6); // -> -2
Math.round(1);    // -> 1
Math.round();     // -> NaN
```

<br>
<br>


### Math.ceil

인수로 전달된 숫자의 `소수점 이하를 올림한 정수`를 반환한다.

```javascript
Math.ceil(1.4);  // -> 2
Math.ceil(1.6);  // -> 2
Math.ceil(-1.4); // -> -1
Math.ceil(-1.6); // -> -1
Math.ceil(1);    // -> 1
Math.ceil();     // -> NaN
```

<br>
<br>


### Math.sqrt

인수로 전달된 숫자의 `제곱근`을 반환한다.

```javascript
Math.sqrt(9);  // -> 3
Math.sqrt(-9); // -> NaN
Math.sqrt(2);  // -> 1.414213562373095
Math.sqrt(1);  // -> 1
Math.sqrt(0);  // -> 0
Math.sqrt();   // -> NaN
```

<br>
<br>


### Math.random

임의의 난수를 발생시켜 반환한다.  
반환한 난수는 0에서 1미만의 실수이다.

```javascript
Math.random(); // 0에서 1 미만의 랜덤 실수(0.8208720231391746)

/*
1에서 10 범위의 랜덤 정수 취득
1) Math.random으로 0에서 1 미만의 랜덤 실수를 구한 다음, 10을 곱해 0에서 10 미만의
랜덤 실수를 구한다.
2) 0에서 10 미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반환한다.
*/
const random = Math.floor((Math.random() * 10) + 1);
console.log(random); // 1에서 10 범위의 정수
```

<br>
<br>


### Math.max

전달받은 인수중에 가장 큰 수를 반환한다.

```javascript
Math.max(1); // -> 1
Math.max(1, 2); // -> 2
Math.max(1, 2, 3); // -> 3
Math.max(); // -> -Infinity
```


