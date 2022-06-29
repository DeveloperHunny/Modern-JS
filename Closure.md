## Closure
---
> 내부함수가 외부함수 Context에 접근할 수 있는 것을 의미한다.<br>
> 자바스크립트에선 함수 안에 또 다른 "함수"를 선언할 수 있고 이를 "내부함수"라고 부른다.<br>

```javascript
function outer(){
    var title = 'coding everybody';
    function inner(){
        alert(title);
    }
    inner();
}
outer();
```

위의 예제를 보면, outer 함수에서 inner 함수가 정의되어 있고 inner 함수는 outer 함수의 변수를 사용할 수 있다.<br>

<span style="color:red">
이때 outer 함수가  소멸된 이후에도 inner 함수가 outer 함수의 변수에 접근할 수 있다.<br>
이러한 메커니즘을 "Closure"라고 한다.<br>
</span>


<br>
