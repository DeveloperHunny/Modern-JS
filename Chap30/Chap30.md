## Date
---

* 표준 빌인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 표준 빌트인 객체이면서 생성자 함수이다.

<br>

> **UTC와 KST**  
> * UTC는 국제 표준시를 말한다.  
> * KST는 UTC에 9시간을 더한 시간으로 한국 표준시를 말한다.  
> * 날짜와 시간은 JS코드가 실행되는 시스템의 시계에 의해 결정된다.

<br>
<br>

## Date 생성자 함수
---

<br>

* Date 객체는 `1970년 1월 1일 00:00:00부터 현재까지 밀리초`를 나타내는 값을 가지고 있다.  
* 이를 통해 Date 객체는 날짜와 시간을 나타내는 정수값을 가진다.  

<br>
<br>

### new Date()

<br>

Date 생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 Date 객체가 반환된다.  

 ```javascript
 new Date(); // -> Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)
 ```

 <br>

 만약 new 연산자없이 호출하면 날짜와 시간 정보를 나타내는 문자열을 반환한다.

```javascript
Date(); // -> "Mon Jul 06 2020 01:10:47 GMT+0900 (대한민국 표준시)"
```

<br>
<br>
<br>

### new Date(millisecons)

<br>

Date 생성자 함수에 밀리초를 인수로 전달하면 `1970년 1월 1일 00:00:00`를 기준으로 전달된 인수만큼 경과한 날짜와 시간을 가지는 Date 객체를 반환한다.

```javascript
// 한국 표준시 KST는 협정 세계시 UTC에 9시간을 더한 시간이다.
new Date(0); // -> Thu Jan 01 1970 09:00:00 GMT+0900 (대한민국 표준시)

/*
86400000ms는 1day를 의미한다.
1s = 1,000ms
1m = 60s * 1,000ms = 60,000ms
1h = 60m * 60,000ms = 3,600,000ms
1d = 24h * 3,600,000ms = 86,400,000ms
*/
new Date(86400000); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)
```

<br>
<br>
<br>

### new Date(dateString)

<br>

Date 생성자 함수에 `날짜와 시간을 나타내는 문자열`을 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.


> 단, 전달된 문자열은 Date.parse 메서드로 해석 가능한 형식이어야 한다.

<br>


```javascript
new Date('May 26, 2020 10:00:00');
// -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

new Date('2020/03/26/10:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

<br>
<br>
<br>

### new Date(year,month,[day,hour,minute,second,millisecond])

<br>

Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

* 이때 연, 월은 반드시 지정해야 하고 그 외 지정하지 않은 옵션은 0 또는 1로 초기화된다.

<br>

```javascript
// 월을 나타내는 2는 3월을 의미한다. 2020/3/1/00:00:00:00
new Date(2020, 2);
// -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미한다. 2020/3/26/10:00:00:00
new Date(2020, 2, 26, 10, 00, 00, 0);
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

// 다음처럼 표현하면 가독성이 훨씬 좋다.
new Date('2020/3/26/10:00:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

<br>
<br>
<br>

## Date 메서드
---

<br>
<br>

### Date.now

<br>

* `1970년 1월 1일 00:00:00`을 기점으로 현재까지 경과한 밀리초를 반환한다.

```javascript
const now = Date.now(); // -> 1593971539112

// Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을
// 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.
// (30.1.2절 "new Date(milliseconds)" 참고)
new Date(now); // -> Mon Jul 06 2020 02:52:19 GMT+0900 (대한민국 표준시)
```

<br>
<br>


### Date.parse

* `1970년 1월 1일 00:00:00`부터 인수로 전달된 문자열(시간 형식)까지의 밀리초를 반환한다.

> 시간 형식은 new Date(dateString)의 인수와 동일한 형식이어야 한다.

```javascript
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC'); // -> 86400000

// KST
Date.parse('Jan 2, 1970 09:00:00'); // -> 86400000

// KST
Date.parse('1970/01/02/09:00:00');  // -> 86400000
```

<br>
<br>

### Date.UTC

* `1970년 1월 1일 00:00:00`부터 인수로 전달된 문자열(시간 형식)까지의 밀리초를 반환한다.

> 시간 형식은 new Date(year, month, ...param)의 인수와 동일한 형식이어야 한다.  
> 이때, month는 0부터 11까지이므로 주의해야 한다.

```javascript
Date.UTC(1970, 0, 2); // -> 86400000
Date.UTC('1970/1/2'); // -> NaN
```

<br>
<br>

### Date.prototype.getFullYear

* Date 객체의 연도를 나타내는 정수를 반환한다.

<br>
<br>

### Date.prototype.getFullYear

* Date 객체의 연도를 설정한다.  
* 이 외에도 옵션으로 월, 일도 설정이 가능하다.

<br>
<br>

### Date.prototype.getMonth

* Date 객체의 월을 나타내는 0~11 정수를 반환한다.

> 1월은 0, 12월은 11이다.

<br>
<br>

### Date.prototype.setMonth

* Date 객체의 월을 설정한다.

> 이때 설정값은 0부터 11까지이다.

<br>
<br>

### Date.prototype.getDate

* Date 객체의 날짜(1~31)를 반환한다.

<br>
<br>

### Date.prototype.setDate

* Date 객체의 날짜(1~31)를 설정한다.

<br>
<br>

### Date.prototype.getTimezoneOffset

* UTC와 Date 객체에 저장된 locale 시간과의 차이를 분 단위로 반환한다.

> KST는 UTC에 9시간 더한 시간이므로 KST - 9 = UTC이다.

```javascript
const today = new Date(); // today의 지정 로캘은 KST다.

//UTC와 today의 지정 로캘 KST와의 차이는 -9시간이다.
today.getTimezoneOffset() / 60; // -9
```

<br>
<br>

### Date.prototype.toDateString

* 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString();     // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toDateString(); // -> Fri Jul 24 2020
```

<br>
<br>

### Date.prototype.toTimeString

* 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열을 반환한다.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString();     // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toTimeString(); // -> 12:30:00 GMT+0900 (대한민국 표준시)
```

<br>
<br>

### Date.prototype.toISOString

* ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString();    // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toISOString(); // -> 2020-07-24T03:30:00.000Z

today.toISOString().slice(0, 10); // -> 2020-07-24
today.toISOString().slice(0, 10).replace(/-/g, ''); // -> 20200724
```

<br>
<br>

### Date.prototype.toLocaleString

* 인수로 전달한 locale 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.  

> 이때, 인수를 생략하면 자동으로 동작중인 시스템의 locale을 적용한다.

```javascript
const today = new Date('2020/7/24/12:30');

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleString(); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US'); // -> 7/24/2020, 12:30:00 PM
today.toLocaleString('ja-JP'); // -> 2020/7/24 12:30:00
```

<br>
<br>