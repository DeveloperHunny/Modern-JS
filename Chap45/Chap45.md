## 프로미스(Promise)

자바스크립트는 비동기 처리를 위해 콜백 함수를 사용한다.  
하지만 콜백 패턴은 가독성이 나쁘고 에러 처리가 곤란하다는 단점이 있다.  
이에 ES6에서 비동기 처리를 위해 프로미스(Promise)를 도입했다.

<br>
<br>
<br>

### 비동기 처리를 위한 콜백 패턴의 단점

<br>

**콜백 헬**

```javascript
// GET 요청을 위한 비동기 함수
const get = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콘솔에 출력한다.
      console.log(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// id가 1인 post를 취득
get('https://jsonplaceholder.typicode.com/posts/1');
/*
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere ...",
  "body": "quia et suscipit ..."
}
*/
```

위 예제에서 get 함수는 서버의 응답 결과를 콘솔에 출력한다.  
이때 get 함수는 비동기 함수로 동작한다.  

<br>

**비동기 함수란**  
* 함수를 호출했을 때 함수 내부의 비동기로 동작하는 코드가 완료되지 않아도 기다리지 않고 즉시 종료되는 함수를 말한다.  
* 따라서 비동기로 동작하는 코드 처리 결과를 외부로 반환하거나 상위 스코프 변수에 할당하면 기대한 대로 동작하지 않는다.  

[비동기 함수 잘못된 예시]
```javascript
let g = 0;

// 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나
// 상위 스코프의 변수에 할당하지 못한다.
setTimeout(() => { g = 100; }, 0);
console.log(g); // 0
```

<br>
<br>

get 함수가 비동기 함수인 이유는 `onload 이벤트 핸들러`가 비동기로 동작하기 때문이다.  

1. get 함수 호출
2. GET 요청 전송
3. onload 이벤트 핸들러 등록
4. undefined 반환하고 종료
5. onload 이벤트 실행

위와 같이 비동기적으로 동작하기 때문에 상위 스코프 변수에 결과를 할당하면 기대한 대로 동작하지 않는다.  

<br>
<br>

**왜 비동기 함수는 기대한 대로 동작하지 않을까?**

서버로부터 응답이 도착하면 xhr 객체에서 load 이벤트가 발생한다.  
이때 xhr.onload 핸들러에 바인딩한 이벤트가 즉시 실행되는 것이 아니라 `태스크 큐`에 저장되어 대기한다.   
즉, `콜 스택`이 모두 비워지면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다.  
**xhr.onload 이벤트 핸들러가 실행되는 시점에는 이미 console.log가 종료된 이후이다.**

<br>

> 비동기 함수 처리 결과는 외부에 반환할 수 없고, 상위 스코프 변수에 할당할 수도 없다.  
> 따라서 비동기 함수 후속 처리는 비동기 함수 내부에서 수행되어야 한다.  
> 이에 비동기 함수 후속 처리를 위해 콜백 함수를 전달하는 것이 일반적이다. (성공, 실패 콜백 함수 전달)

```javascript
// GET 요청을 위한 비동기 함수
const get = (url, successCallback, failureCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콜백 함수에 인수로 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
      successCallback(JSON.parse(xhr.response));
    } else {
      // 에러 정보를 콜백 함수에 인수로 전달하면서 호출하여 에러 처리를 한다.
      failureCallback(xhr.status);
    }
  };
};

// id가 1인 post를 취득
// 서버의 응답에 대한 후속 처리를 위한 콜백 함수를 비동기 함수인 get에 전달해야 한다.
get('https://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
/*
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere ...",
  "body": "quia et suscipit ..."
}
*/
```

<br>

이때 비동기 함수 처리 결과에 대한 콜백 함수가 비동기 함수이면 콜백 함수가 중첩되어 복잡도가 높아진다.  
이러한 현상을 **콜백 헬(Callback Hall)** 이라 한다.  

```javascript
// GET 요청을 위한 비동기 함수
const get = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
      callback(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
get(`${url}/posts/1`, ({ userId }) => {
  console.log(userId); // 1
  // post의 userId를 사용하여 user 정보를 취득
  get(`${url}/users/${userId}`, userInfo => {
    console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret",...}
  });
});
```

<br>
<br>
<br>

### 에러 처리의 한계

비동기 처리를 위한 콜백 패턴의 또 다른 문제점은 `에러 처리`가 곤란하다는 것이다.

```javascript
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error('캐치한 에러', e);
}
```

<br>

* 위 예제에서 try catch문은 에러를 캐치하지 못한다.  
* 이는 setTimeout의 콜백 함수 호출자가 setTimeout이 아니기 때문이다.  
* 에러는 `호출자 방향`으로 전파가 되는데 setTimeout의 콜백 함수는 다른 함수이기 때문에 setTimeout 내부의 catch문에서 에러를 잡지 못한다.  

<br>

> 위와 같은 비동기 처리에서 콜백 패턴의 단점을 해결하기 위해 ES6에서 `프로미스`가 도입되었다.

<br>
<br>
<br>

### 프로미스의 생성

Promise 생성자 함수를 new 연산자와 함꼐 호출하여 프로미스 객체를 생성한다.  
Promise 생성자 함수는 비동기 처리를 수행할 `콜백 함수`를 전달받는데 이 콜백 함수는 `resolve`와 `reject` 함수를 인수로 전달받는다.  

<br>

```javascript
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
  if (/* 비동기 처리 성공 */) {
    resolve('result');
  } else { /* 비동기 처리 실패 */
    reject('failure reason');
  }
});
```

Promise 생성자 함수가 인수로 전달받은 콜백 함수에서 비동기 처리를 수행한다.  
이후 성공하면 resolve 함수를 호출하고, 실패하면 reject 함수를 호출한다.  

<br>
<br>

```javascript
// GET 요청을 위한 비동기 함수
const promiseGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet('https://jsonplaceholder.typicode.com/posts/1');
```
앞의 get 함수 예제를 위와 같이 Promise를 통해 구현할 수 있다.  

<br>
<br>

프로미스는 다음과 같이 비동기 처리에 대한 상태 정보를 갖는다.

|프로미스 상태 정보 | 의미 | 상태 변경 조건 | 
| :---: | :---: | :---: |
| pending | 비동기 처리가 아직 수행되지 않은 상태 | 프로미스가 생성된 직후 기본 상태 |
| fulfilled | 비동기 처리가 수행된 상태(성공) | resolve 함수 호출 |
| rejected | 비동기 처리가 수행된 상태(실패) | reject 함수 호출 |

<br>

생성된 직후의 프로미스는 기본적으로 `pending` 상태이다.

* 비동기 처리 성공 : resolve 함수를 호출해 상태를 fulfilled 상태로 변경한다.
* 비동기 처리 실패 : reject 함수를 호출해 상태를 rejected 상태로 변경한다.

<br>
<br>
<br>

### 프로미스의 후속 처리 메서드

프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야 한다.  
이를 위해 프로미스 후속 메서드 then, catch, finally를 제공한다.  

<br>
<br>

**Promise.prototype.then**

then 메서드는 두 개의 콜백 함수를 인수로 전달받는다.

* 첫 번째 콜백 함수는 프로미스가 fulfilled 상태가 되면 호출된다.
* 두 번째 콜백 함수는 프로미스가 rejected 상태가 되면 호출된다.  

```javascript
// fulfilled
new Promise(resolve => resolve('fulfilled'))
  .then(v => console.log(v), e => console.error(e)); // fulfilled

// rejected
new Promise((_, reject) => reject(new Error('rejected')))
  .then(v => console.log(v), e => console.error(e)); // Error: rejected
```

* 이때, then에 전달되는 콜백 함수에는 프로미스의 처리 결과를 인수로 전달받는다.

<br>
<br>
<br>

**Promise.prototype.catch**

* catch 메서드는 한 개의 콜백 함수를 인수로 전달받는다.  
* catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우에만 호출된다.  

```javascript
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
  .catch(e => console.log(e)); // Error: rejected
```

<br>
<br>
<br>

**Promise.prototype.finally**

* finally 메서드는 한 개의 콜백 함수를 인수로 전달받는다.  
* finally 메서드의 콜백 함수는 성공과 실패 상관없이 무조건 한 번 호출된다.  
* finally 메서드는 프로미스 성공 유무와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용한다.

```javascript
const promiseGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log('Bye!'));
```

<br>
<br>

### 프로미스 에러 처리

콜백 패턴은 에러 처리가 곤란한다는 문제가 있다.  
프로미스는 에러를 문제없이 처리할 수 있다.  

프로미스에서 비동기 처리 과정에서 발생한 에러는 두 가지 방법을 통해 처리할 수 있다.

<br>
<br>

* 에러를 then 메서드의 두 번째 콜백 함수로 처리할 수 있다.  

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl).then(
  res => console.log(res),
  err => console.error(err)
); // Error: 404
```

<br>
<br>

* 에러를 catch 메서드를 사용해 처리할 수 있다.  

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Error: 404
```

> then 메서드의 두 번째 콜백 함수로 에러를 처리하는 것은 가독성이 떨어진다.  
> 따라서 catch 메서드를 사용해 에러를 처리하는 것을 권장한다.

<br>
<br>
<br>

### 프로미스 체이닝

콜백 패턴은 콜백 함수가 콜백 함수를 호출하는 `콜백 헬`이 발생할 수 있다는 문제가 있다.  
프로미스는 then, catch, finally 후속 처리 메서드를 통해 해당 문제를 해결할 수 있다.  

<br>
<br>

```javascript
const url = 'https://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
  // 취득한 post의 userId로 user 정보를 취득
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then(userInfo => console.log(userInfo))
  .catch(err => console.error(err));
```

<br>
 
 위 예제에서 then -> then -> catch 순서로 후속 처리 메서드를 호출했다.  
 후속 처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출이 가능하다.  
 이를 `프로미스 체이닝`이라 한다.

 <br>
 
 `프로미스 체이닝`을 통해 비동기 처리 결과를 전달받아 훗혹 처리를 하므로 콜백 헬이 발생하지 않는다.  
 다만 프로미스도 콜백 패턴을 사용하므로 가독성이 좋지 않다.  
 이 문제는 ES8에서 도입된 `async/await`를 통해 해결할 수 있다.  

```javascript
const url = 'https://jsonplaceholder.typicode.com';

(async () => {
  // id가 1인 post의 userId를 취득
  const { userId } = await promiseGet(`${url}/posts/1`);

  // 취득한 post의 userId로 user 정보를 취득
  const userInfo = await promiseGet(`${url}/users/${userId}`);

  console.log(userInfo);
})();
```

<br>
<br>
<br>

### 프로미스 정적 메서드

Promise는 주로 생성자 함수로 사용되지만 객체이므로 메서드를 가질 수 있다.  
Promise는 5가지 정적 메서드를 제공한다.  

<br>
<br>

**Promise.resolve & Promise.reject**

해당 정적 메서드는 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용한다.  

Promise.resolve 메서드는 인수로 전달받은 값을 resolve하는 프로미스를 생성한다.  

```javascript
// 배열을 resolve하는 프로미스를 생성
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1, 2, 3]
```

* reject도 똑같은 방식으로 동작한다.

<br>
<br>

**Promise.all**

Promise.all 메서드는 여러 개의 비동기 처리를 모두 병렬처리할 때 사용한다.

```javascript
const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 순차적으로 처리
const res = [];
requestData1()
  .then(data => {
    res.push(data);
    return requestData2();
  })
  .then(data => {
    res.push(data);
    return requestData3();
  })
  .then(data => {
    res.push(data);
    console.log(res); // [1, 2, 3] ⇒ 약 6초 소요
  })
  .catch(console.error);
```

위 예제는 세 개의 비동기 처리를 순차적으로 처리한다.  
즉, 앞에 있는 비동기가 처리가 완료되면 다음 비동기 처리를 수행한다.  
따라서 총 1+2+3=6초가 걸린다.  

<br>

이를 Promise.all 메서드를 통해 세 개의 비동기 처리를 병렬로 처리해보자.  
```javascript
const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));

Promise.all([requestData1(), requestData2(), requestData3()])
  .then(console.log) // [ 1, 2, 3 ] ⇒ 약 3초 소요
  .catch(console.error);
```

해당 예제에서는 1,2,3이 순서대로 배열에 저장된다.  
하지만 첫 번째 프로미스가 가장 나중에 fulfilled 상태가 되어도 첫 번째 프로미스가 resolve한 처리 결과부터 차례대로 배열에 저장한다.  
즉, 처리 순서가 보장된다.  

<br>

Promise.all 메서드는 프로미스가 하나라도 rejected 상태가 되면 나머지 프로미스를 실행하지 않고 즉시 종료한다.  
```javascript
Promise.all([
  new Promise((_, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Error 3')), 1000))
])
  .then(console.log)
  .catch(console.log); // Error: Error 3
```

<br>
<br>

**Promise.race**

Promise.race는 Promise.all 메서드와 유사하게 프로미스 배열을 인수로 받는다.  
이때 Promise.race는 모든 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 가장 먼저 fulfilled 상태가 된 프로미스 처리 결과를 반환한다.  

```javascript
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
])
  .then(console.log) // 3
  .catch(console.log);
```

<br>
<br>

### 마이크로태스크 큐

```javascript
setTimeout(() => console.log(1), 0);

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```

위의 예제는 1 -> 2 -> 3 순으로 출력될 것처럼 보이지만 2 -> 3 -> 1의 순으로 출력된다.  
그 이유는 프로미스 후속 처리 메서드의 콜백 함수는 태스크 큐가 아니라 `마이크로태스크 큐`에 저장되기 때문이다.  

프로미스 콜백 함수 외의 비동기 함수의 콜백 함수나 이벤트 핸들러도 태스크 큐에 일시 저장된다.  
그러나 `마이크로 태스크 큐`가 태스크 큐보다 우선순위가 높아 우선 처리가 된다.

<br>
<br>

## Fetch

fetch 함수는 XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API이다.  
fetch 함수는 프로미스를 지원하기 때문에 비동기 처리가 더 수월하다는 장점이 있다.  

<br>

* fetch 함수에 첫 번째 인수로 URL만 전달하면 GET 요청을 전달한다.

```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => console.log(response));
```

<br>
<br>

* fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스를 반환한다.  

```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
  // response는 HTTP 응답을 나타내는 Response 객체이다.
  // json 메서드를 사용하여 Response 객체에서 HTTP 응답 몸체를 취득하여 역직렬화한다.
  .then(response => response.json())
  // json은 역직렬화된 HTTP 응답 몸체이다.
  .then(json => console.log(json));
  // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
```

<br>
<br>

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생한다.
fetch(wrongUrl)
  .then(() => console.log('ok'))
  .catch(() => console.log('error'));
```

<br>
  
부적절한 url이 지정되었기 때문에 404 Not Found 에러가 발생하고 catch 메서드가 실행될 것 같지만 then 메서드가 실행된다.  

> fetch 함수가 반환하는 프로미스는 기본적으로 HTTP 에러가 발생해도 에러를 reject하지 않는다.  
> ok 상태를 false로 설정한 Response 객체를 resolve한다.  
> 단, 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에는 reject를 한다.

<br>

따라서 다음과 같이 ok 상태를 확인해 에러를 처리해야 한다.  

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생한다.
fetch(wrongUrl)
  // response는 HTTP 응답을 나타내는 Response 객체다.
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(todo => console.log(todo))
  .catch(err => console.error(err));
```

<br>

> 참고로 Axios는 모든 HTTP 에러를 reject하는 프로미스를 반환한다.  
> 따라서 모든 에러를 catch 문에서 처리할 수 있어 편하다.  


