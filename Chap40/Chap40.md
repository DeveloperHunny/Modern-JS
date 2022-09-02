### Event Driven Programming

브라우저는 처리해야 할 특정 사건이 발생하면 이를 감지하여 이벤트를 발생시킨다.

* 이벤트가 발생했을 때, 호출될 함수를 `이벤트 핸들러`라고 한다.
* `이벤트 핸들러`를 브라우저에게 위임하는 것을 `이벤트 핸들러 등록`이라고 한다.
  
<br>

예를 들어, 사용자가 버튼을 클릭했을 때 함수를 호출하여 어떤 처리를 하고 싶다고 가정해보자.  
이때 문제는, `언제 함수를 호출해야 하는가`이다.  

> 따라서, 개발자가 명시적으로 함수를 호출하는 것이 아니라 브라우저에게 함수 호출을 위임하는 것이다.

<br>

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
    $button.onclick = () => { alert('button click'); };
  </script>
</body>
</html>
```

이와 같이 프로그램 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 `Event-driven-programming`이라고 한다.

<br>
<br>
<br>

### 이벤트 타입

`이벤트 타입`은 이벤트의 종류를 나타내는 문자열이다.  
약 200여 가지가 존재하며, 밑의 이벤트들이 사용 빈도가 높은 이벤트 종류이다.  

<br>

**이벤트 종류(사용 빈도 높은 것)**
> 1. 마우스 이벤트
> 2. 키보드 이벤트
> 3. 포커스 이벤트
> 4. 폼 이벤트
> 5. 값 변경 이벤트
> 6. DOM 뮤테이션 이벤트
> 7. 뷰 이벤트
> 8. 리소스 이벤트

<br>
<br>
<br>

### 이벤트 핸들러 등록

`이벤트 핸들러`는 이벤트가 발생했을 때 브라우저에 호출을 위임한 함수이다.  
즉, 이벤트가 발생했을 때 브라우저에 의해 호출될 함수가 `이벤트 핸들러`이다.  
이벤트 핸들러 등록하는 방법은 크게 3가지가 존재한다.

<br>
<br>

### 이벤트 핸들러 어트리뷰트 방식

HTML 요소 어트리뷰트 중에 이벤트에 대응하는 `이벤트 핸들러 어트리뷰트`가 있다.  
`onclick과 같이 on 접두사`와 이벤트의 종류를 나타내는 `이벤트 타입`으로 이루어져 있다.  

```javascript
<!DOCTYPE html>
<html>
<body>
  <button onclick="sayHi('Lee')">Click me!</button>
  <script>
    function sayHi(name) {
      console.log(`Hi! ${name}.`);
    }
  </script>
</body>
</html>
```

> 이때 주의할 점은 이벤트를 등록할 때 함수 참조를 등록해야 된다는 점이다.  
> 만약 함수 호출문을 등록하면 호출문의 결과가 이벤트 핸들러로 등록되어 문제가 발생한다.  

<br>

이벤트 핸들러 어트리뷰트 등록 방식은 오래된 방식으로 사용하지 않는 것이 좋다.  
하지만 모던 자바스크립트에서는 해당 방식을 사용하는 경우가 존재한다.  
CBD(Component Based Development) 방식의 Angular/React/Svelte/Vue.js와 같은 프레임워크에선 해당 방식을 사용한다.

> CBD에선 HTML, CSS, JS를 개별 요소가 아닌 뷰를 구성하기 위한 하나의 요소를 보기 때문이라고 한다.

```javascript
<!-- Angular -->
<button (click)="handleClick($event)">Save</button>

{ /* React */ }
<button onClick={handleClick}>Save</button>

<!-- Svelte -->
<button on:click={handleClick}>Save</button>

<!-- Vue.js -->
<button v-on:click="handleClick($event)">Save</button>
```

<br>
<br>
<br>

### 이벤트 핸들러 프로퍼티 방식

이벤트 핸들러 프로퍼티 방식은 객체 프로퍼티에 함수를 바인딩하여 이벤트 핸들러를 등록하는 방식이다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
    $button.onclick = function () {
      console.log('button click');
    };
  </script>
</body>
</html>
```

<br>

위와 같이 이벤트 핸들러를 등록시키기 위해선 이벤트를 발생시킬 객체인 `이벤트 타깃`과  
이벤트 종류를 나타내는 `이벤트 타입` 그리고 `이벤트 핸들러`를 지정해야 한다.

```javascript
$button.onclick = function(){...}
```

> 이벤트 타깃 : $button  
> 이벤트 타입 : onclick  
> 이벤트 핸들러 : function(){...}  

<br>

결과적으로 앞 서 살펴본 `이벤트 핸들러 어트리뷰트 방식`도 프로퍼티에 바인딩되는 것이므로 동일하다고 볼 수 있다.  
하지만 해당 방식을 이용하면 HTML과 JS가 섞이는 것을 막을 수 있고, 여러 개의 이벤트를 바인딩할 수 있다는 장점이 있다.  

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들러만을 바인딩할 수 있다.
    // 첫 번째로 바인딩된 이벤트 핸들러는 두 번째 바인딩된 이벤트 핸들러에 의해 재할당되어
    // 실행되지 않는다.
    $button.onclick = function () {
      console.log('Button clicked 1');
    };

    // 두 번째로 바인딩된 이벤트 핸들러
    $button.onclick = function () {
      console.log('Button clicked 2');
    };
  </script>
</body>
</html>
```

<br>
<br>
<br>

### addEventListener 메서드 방식

앞 서 살펴본 `이벤트 핸들러 어트리뷰트 방식`과 `이벤트 핸들러 프로퍼티 방식`은 DOM Level 0부터 지원되던 방식이다.  
하지만 DOM Level 2부터는 addEventListener를 통해 이벤트 핸들러를 등록할 수 있다.  

<br>

```javascript
EventTarget.addEventListener('eventType', functionName, [useCapture]);
```

* 첫 번째 인수 : 이벤트 종류를 나타내는 이벤트 타입 (on을 붙이지 않는다.)  
* 두 번째 인수 : 이벤트 핸들러
* 세 번째 인수 : 이벤트를 캐치할 이벤트 전파 단계를 지정  (false를 지정하면 버블링 단계에서 캐치, true를 지정하면 캡처링 단계에서 캐치)

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // addEventListener 메서드 방식
    $button.addEventListener('click', function () {
      console.log('button click');
    });
  </script>
</body>
</html>
```

<br>
<br>

**만약 addEventListener 방식과 이벤트 핸들러 프로퍼티 방식을 모두 사용하면 어떻게 동작할까?**

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티 방식
    $button.onclick = function () {
      console.log('[이벤트 핸들러 프로퍼티 방식]button click');
    };

    // addEventListener 메서드 방식
    $button.addEventListener('click', function () {
      console.log('[addEventListener 메서드 방식]button click');
    });
  </script>
</body>
</html>
```

* addEventListenr 메서드 방식은 이벤트 핸들러 프로퍼티에 아무런 영향을 주지 않는다.
* 따라서 2개 모두 이벤트 핸들러가 호출된다.

<br>
<br>
<br>

### 이벤트 핸들러 제거

addEventListener 메서드로 등록한 이벤트 핸들러를 제거하려면 removeEventListener를 사용하면 된다.  

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    const handleClick = () => console.log('button click');

    // 이벤트 핸들러 등록
    $button.addEventListener('click', handleClick);

    // 이벤트 핸들러 제거
    // addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에
    // 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.
    $button.removeEventListener('click', handleClick, true); // 실패
    $button.removeEventListener('click', handleClick); // 성공
  </script>
</body>
</html>
```

<br>

> 이때, 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러는 해당 메서드로 제거할 수 없다.
> 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트는 해당 프로퍼티에 null을 할당하여 제거해야 한다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    const handleClick = () => console.log('button click');

    // 이벤트 핸들러 프로퍼티 방식으로 이벤트 핸들러 등록
    $button.onclick = handleClick;

    // removeEventListener 메서드로 이벤트 핸들러를 제거할 수 없다.
    $button.removeEventListener('click', handleClick);

    // 이벤트 핸들러 프로퍼티에 null을 할당하여 이벤트 핸들러를 제거한다.
    $button.onclick = null;
  </script>
</body>
</html>
```

<br>
<br>
<br>

### 이벤트 객체

이벤트가 발생하면 이벤트에 관련한 정보를 담고있는 이벤트 객체가 동적으로 생성된다.  
생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.  

```javascript
<!DOCTYPE html>
<html>
<body>
  <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
  <em class="message"></em>
  <script>
    const $msg = document.querySelector('.message');

    // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
    function showCoords(e) {
      $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
    }

    document.onclick = showCoords;
  </script>
</body>
</html>
```

* 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러 첫 번째 인수로 전달되어 e에 암묵적으로 할당된다.
  
<br>
<br>

> 이때, 이벤트 핸들러 어트리뷰트 방식으로 등록했다면 다음과 같은 방법으로 event 객체를 전달받을 수 있다.

```javascript
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
  </style>
</head>
<!-- 이벤트 핸들러 어트리뷰트 방식의 경우 event가 아닌 다른 이름으로는 이벤트 객체를
전달받지 못한다. -->
<body onclick="showCoords(event)">
  <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
  <em class="message"></em>
  <script>
    const $msg = document.querySelector('.message');

    // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
    function showCoords(e) {
      $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
    }
  </script>
</body>
</html>
```

<br>
<br>
<br>

### 이벤트 객체의 공통 프로퍼티

Event.prototype에 정의되어 있는 이벤트 관련 프로퍼티는 UIEvent, CustomEvent, MouseEvent 등 모든 파생 이벤트 객체에 상속된다.  
즉, Event.prototype의 이벤트 관련 프로퍼티는 모든 이벤트 객체가 상속받는 공통 프로퍼티이다.  

<br>

이벤트 객체 공통 프로퍼티는 다음과 같다.
> 1. type
> 2. target
> 3. eventPhase
> 4. bubbles
> 5. cancleable
> 6. defaultPrevented
> 7. isTrusted
> 8. timeStamp 


<br>
<br>

### 마우스 정보 취득

click, dblclick, mousedown, mouseup, ...와 같은 마우스 관련 이벤트가 발생하면 생성되는 MouseEvent 객체가 있다.  
MouseEvent 객체는 다음과 같은 고유 프로퍼티를 갖는다.

<br>

* 마우스 포인터 좌표 정보 프로퍼티 : screenX/screenY, clientX/clientY, pageX/pageY
* 버튼 정보를 나타내는 프로퍼티 : altKey, ctrlKey, shiftKey, button
  
<br>

예를 들어, DOM 요소를 드래그하여 이동시키는 이벤트를 생각해보자.  
  1. mousedown 이벤트가 발생했을 때 마우스 포인터 좌표를 저장한다.
  2. mosusemove 이벤트가 발생할 때마다 저장한 마우스 포인터 좌표를와 비교하여 DOM 요소를 이동시킨다.
  3. mouseup 이벤트가 발생하면 이벤트 핸들러를 제거하여 이동을 멈춘다.
   

```javascript
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background-color: #fff700;
      border: 5px solid orange;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <script>
    // 드래그 대상 요소
    const $box = document.querySelector('.box');

    // 드래그 시작 시점의 마우스 포인터 위치
    const initialMousePos = { x: 0, y: 0 };
    // 오프셋: 이동할 거리
    const offset = { x: 0, y: 0 };

    // mousemove 이벤트 핸들러
    const move = e => {
      // 오프셋 = 현재(드래그하고 있는 시점) 마우스 포인터 위치 - 드래그 시작 시점의 마우스 포인터 위치
      offset.x = e.clientX - initialMousePos.x;
      offset.y = e.clientY - initialMousePos.y;

      // translate3d는 GPU를 사용하므로 absolute의 top, left를 사용하는 것보다 빠르다.
      // top, left는 레이아웃에 영향을 준다.
      $box.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    };

    // mousedown 이벤트가 발생하면 드래그 시작 시점의 마우스 포인터 좌표를 저장한다.
    $box.addEventListener('mousedown', e => {
      // 이동 거리를 계산하기 위해 mousedown 이벤트가 발생(드래그를 시작)하면
      // 드래그 시작 시점의 마우스 포인터 좌표(e.clientX/e.clientY: 뷰포트 상에서 현재
      // 마우스의 포인터 좌표)를 저장해 둔다. 한번 이상 드래그로 이동한 경우 move에서
      // translate3d(${offset.x}px, ${offset.y}px, 0)으로 이동한 상태이므로
      // offset.x와 offset.y를 빼주어야 한다.
      initialMousePos.x = e.clientX - offset.x;
      initialMousePos.y = e.clientY - offset.y;

      // mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생하면
      // box 요소를 이동시킨다.
      document.addEventListener('mousemove', move);
    });

    // mouseup 이벤트가 발생하면 mousemove 이벤트를 제거해 이동을 멈춘다.
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move);
    });
  </script>
</body>
</html>
```

<br>
<br>
<br>

### 키보드 정보 취득

keydown, keyup, keypress 이벤트가 발생하면 생성되는 KeyboardEvent 타입의 이벤트 객체는 altKey, ctrlKey, shiftKey, metaKey, key, keyCode와 같은 고유 프로퍼티를 갖는다.

<br>

아래는 input 요소 입력 필드에 엔터키가 입력되면 필드에 입력된 값을 모두 출력하는 예제이다.
```javascript
<!DOCTYPE html>
<html>
<body>
  <input type="text" />
  <em class="message"></em>
  <script>
    const $input = document.querySelector('input[type=text]');
    const $msg = document.querySelector('.message');

    $input.onkeyup = e => {
      // e.key는 입력한 키 값을 문자열로 반환한다.
      // 입력한 키가 'Enter', 즉 엔터 키가 아니면 무시한다.
      if (e.key !== 'Enter') return;

      // 엔터키가 입력되면 현재까지 입력 필드에 입력된 값을 출력한다.
      $msg.textContent = e.target.value;
      e.target.value = '';
    };
  </script>
</body>
</html>
```

<br>
<br>
<br>

### 이벤트 전파

DOM 트리 상에서 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다.  
이를 `이벤트 전파`라고 한다.

**이벤트 전파 단계**

* 캡처링 단계 : 이벤트가 상위 요소에서 하위 요소로 전파
* 타깃 단계 : 이벤트가 이벤트 타깃에 도달
* 버블링 단계 : 이벤트가 하위 요소에서 상위 요소로 전파

<br>

```javascript
<!DOCTYPE html>
<html>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
</body>
</html>
```

해당 예제에서 ``를 클릭하여 클릭 이벤트가 발생했다고 가정해보자.

> 캡처링 단계 : window -> document -> html -> body -> ul -> li
> 타깃 단계 : 이벤트 객체가 li 요소에 도착
> 버블링 단계 : li -> ul -> body -> html -> document -> window

<br>
<br>

* addEventListner의 세 번째 인수를 이용하여 각 단계들을 캡처할 수 있다.
```javascript
<!DOCTYPE html>
<html>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script>
    const $fruits = document.getElementById('fruits');
    const $banana = document.getElementById('banana');

    // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
    // 캡처링 단계의 이벤트를 캐치한다.
    $fruits.addEventListener('click', e => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
    }, true);

    // 타깃 단계의 이벤트를 캐치한다.
    $banana.addEventListener('click', e => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
    });

    // 버블링 단계의 이벤트를 캐치한다.
    $fruits.addEventListener('click', e => {
      console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
      console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
      console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
    });
  </script>
</body>
</html>
```

> **이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서 캐치할 수 있다.**

<br>
<br>

* 대부분 이벤트는 캡처링과 버블링을 통해 전파된다.
* 하지만 다음 이벤트는 버블링을 통해 전파되지 않으므로 상위 요소에서는 캡처링 단계에서만 이벤트 확인이 가능하다.

1. 포커스 이벤트 : focus/blur
2. 리소스 이벤트 : load/unload/abort/error
3. 마우스 이벤트 : mouseenter/mouseleave

<br>
<br>
<br>

### 이벤트 위임

다음 예제는 사용자가 내비게이션 아이템(li 요소)를 클릭하여 선택하면 현재 선택된 아이템에 active 클래스를 추가하고   
그 외 모든 내비게이션 아이템에 active 클래스를 제거하는 예제이다.

<br>

```javascript
<!DOCTYPE html>
<html>
<head>
  <style>
    #fruits {
      display: flex;
      list-style-type: none;
      padding: 0;
    }

    #fruits li {
      width: 100px;
      cursor: pointer;
    }

    #fruits .active {
      color: red;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav>
    <ul id="fruits">
      <li id="apple" class="active">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </nav>
  <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
  <script>
    const $fruits = document.getElementById('fruits');
    const $msg = document.querySelector('.msg');

    // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
    // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.
    function activate({ target }) {
      [...$fruits.children].forEach($fruit => {
        $fruit.classList.toggle('active', $fruit === target);
        $msg.textContent = target.id;
      });
    }

    // 모든 내비게이션 아이템(li 요소)에 이벤트 핸들러를 등록한다.
    document.getElementById('apple').onclick = activate;
    document.getElementById('banana').onclick = activate;
    document.getElementById('orange').onclick = activate;
  </script>
</body>
</html>
```

<br>

* 만약 위 예제에서 내비게이션 아이템이 100개라면 100개 이벤트 핸들러를 등록해야 한다.  
* 이는 성능 저하의 원인이 될 뿐더러 유지 보수에 매우 부적합하므로 피해야 한다.

> `이벤트 위임`은 여러 개의 하위 요소에 이벤트 핸들러를 각각 등록하는 대신에 상위 요소에 핸들러를 등록하는 방법이다.  
> 상위 요소에 이벤트 위임을 통해 이벤트를 등록하면 성능이 좋아질 뿐더러 유지 보수에도 용이하다.  

```javascript
<!DOCTYPE html>
<html>
<head>
  <style>
    #fruits {
      display: flex;
      list-style-type: none;
      padding: 0;
    }

    #fruits li {
      width: 100px;
      cursor: pointer;
    }

    #fruits .active {
      color: red;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav>
    <ul id="fruits">
      <li id="apple" class="active">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </nav>
  <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
  <script>
    const $fruits = document.getElementById('fruits');
    const $msg = document.querySelector('.msg');

    // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
    // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.
    function activate({ target }) {
      // 이벤트를 발생시킨 요소(target)가 ul#fruits의 자식 요소가 아니라면 무시한다.
      if (!target.matches('#fruits > li')) return;

      [...$fruits.children].forEach($fruit => {
        $fruit.classList.toggle('active', $fruit === target);
        $msg.textContent = target.id;
      });
    }

    // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있다.
    $fruits.onclick = activate;
  </script>
</body>
</html>
```

<br>

> 위와 같이 이벤트 위임을 통해 이벤트를 등록할 때 주의할 점은 이벤트를 발생시킨 DOM 요소가 개발자가 기대한 DOM이 아닐 수 있다는 것이다.  
> 위 예제에서 ul 하위 요소에 있는 모든 클릭 이벤트에 해당 이벤트가 적용되므로 li 요소 한해서만 해당 이벤트가 발생되도록 주의해야 한다.  

<br>
<br>
<br>

### DOM 요소의 기본 동작 조작

DOM 요소는 저마다 기본 동작이 있다.

* a 요소를 클릭하면 href 어트리뷰트에 저장된 링크로 이동
* checkbox 요소를 클릭하면 체크 또는 해제
  
> 이때 이벤트 객체의 preventDefault 메서드는 이러한 기본 동작을 중단시킨다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <a href="https://www.google.com">go</a>
  <input type="checkbox">
  <script>
    document.querySelector('a').onclick = e => {
      // a 요소의 기본 동작을 중단한다.
      e.preventDefault();
    };

    document.querySelector('input[type=checkbox]').onclick = e => {
      // checkbox 요소의 기본 동작을 중단한다.
      e.preventDefault();
    };
  </script>
</body>
</html>
```

<br>
<br>
<br>

### 이벤트 핸들러 내부의 this

<br>

**1. 이벤트 핸들러 어트리뷰트 방식**

다음 예제의 handleClick 함수 내부의 this는 전역 객체 window를 가리킨다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <button onclick="handleClick()">Click me</button>
  <script>
    function handleClick() {
      console.log(this); // window
    }
  </script>
</body>
</html>
```

> 일반 함수로서 호출되는 함수 내부의 this는 전역 객체를 가리킨다.
> 단, 이벤트 핸들러를 호출할 때 인수로 전달된 this는 바인딩한 DOM 요소를 가리킨다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <button onclick="handleClick(this)">Click me</button>
  <script>
    function handleClick(button) {
      console.log(button); // 이벤트를 바인딩한 button 요소
      console.log(this);   // window
    }
  </script>
</body>
</html>
```

<br>
<br>

**2. 이벤트 핸들러 프로퍼티 방식 & addEventListener 방식**

* 두 방식 모두 이벤트 핸들러 내부 this는 바인딩한 DOM 요소를 가리킨다.  
* 즉, 이벤트 객체의 currentTarget 프로퍼티와 같다.  

```javascript
<!DOCTYPE html>
<html>
<body>
  <button class="btn1">0</button>
  <button class="btn2">0</button>
  <script>
    const $button1 = document.querySelector('.btn1');
    const $button2 = document.querySelector('.btn2');

    // 이벤트 핸들러 프로퍼티 방식
    $button1.onclick = function (e) {
      // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
      console.log(this); // $button1
      console.log(e.currentTarget); // $button1
      console.log(this === e.currentTarget); // true

      // $button1의 textContent를 1 증가시킨다.
      ++this.textContent;
    };

    // addEventListener 메서드 방식
    $button2.addEventListener('click', function (e) {
      // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
      console.log(this); // $button2
      console.log(e.currentTarget); // $button2
      console.log(this === e.currentTarget); // true

      // $button2의 textContent를 1 증가시킨다.
      ++this.textContent;
    });
  </script>
</body>
</html>
```

> 이때, 화살표 함수로 바인딩한 이벤트 핸들러 내부 this는 상위 스코프 this를 가리킨다.
> 화살표 함수는 this 바인딩을 갖지 않는다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <button class="btn1">0</button>
  <button class="btn2">0</button>
  <script>
    const $button1 = document.querySelector('.btn1');
    const $button2 = document.querySelector('.btn2');

    // 이벤트 핸들러 프로퍼티 방식
    $button1.onclick = e => {
      // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
      console.log(this); // window
      console.log(e.currentTarget); // $button1
      console.log(this === e.currentTarget); // false

      // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
      ++this.textContent;
    };

    // addEventListener 메서드 방식
    $button2.addEventListener('click', e => {
      // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
      console.log(this); // window
      console.log(e.currentTarget); // $button2
      console.log(this === e.currentTarget); // false

      // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
      ++this.textContent;
    });
  </script>
</body>
</html>
```

### 이벤트 핸들러에 인수 전달

함수에 인수를 전달하려면 함수 호출할 때 전달해아 한다.  
하지만 이벤트 핸들러 프로퍼티 방식과 addEventListenr는 함수 참조를 등록하기 때문에 인수를 전달할 수 없다.  
이때 다음과 같은 방법으로 인수를 전달할 수 있다.  

```javascript
<!DOCTYPE html>
<html>
<body>
  <label>User name <input type='text'></label>
  <em class="message"></em>
  <script>
    const MIN_USER_NAME_LENGTH = 5; // 이름 최소 길이
    const $input = document.querySelector('input[type=text]');
    const $msg = document.querySelector('.message');

    const checkUserNameLength = min => {
      $msg.textContent
        = $input.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : '';
    };

    // 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달한다.
    $input.onblur = () => {
      checkUserNameLength(MIN_USER_NAME_LENGTH);
    };
  </script>
</body>
</html>
```

<br>
<br>
<br>




