let regExp;

regExp = RegExp(/.../g);

target = "Is this all there is?"

// console.log(regExp.test(target));

// console.log(target.match(regExp));

regExp = RegExp(/A{1,2}/g);

target = "AA AAA A AAAA AAA AA";

console.log(target.match(regExp));