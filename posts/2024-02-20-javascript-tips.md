# JavaScript 实用技巧分享

在日常开发中，掌握一些JavaScript实用技巧可以大大提升开发效率。本文将分享一些我常用的JavaScript技巧，希望对你有所帮助。

## 数组操作技巧

### 数组去重

使用 `Set` 可以轻松实现数组去重：

```javascript
const arr = [1, 2, 2, 3, 3, 4, 5];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]
```

### 数组扁平化

使用 `flat()` 方法可以轻松实现多维数组扁平化：

```javascript
const arr = [1, [2, 3], [4, [5, 6]]];
const flattened = arr.flat(Infinity);
console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

### 数组分组

使用 `reduce` 实现数组的条件分组：

```javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

const grouped = people.reduce((acc, person) => {
  const key = person.age;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(person);
  return acc;
}, {});

console.log(grouped);
// { 25: [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }] }
```

## 对象操作技巧

### 对象解构赋值

使用对象解构可以快速提取属性：

```javascript
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

const { name, age } = user;
console.log(name, age); // Alice 25
```

### 对象属性简写

当对象属性名和变量名相同时，可以简写：

```javascript
const name = 'Alice';
const age = 25;

// 传统写法
const user1 = { name: name, age: age };

// ES6 简写
const user2 = { name, age };
```

### 对象合并

使用扩展运算符合并对象：

```javascript
const defaults = { theme: 'dark', lang: 'zh' };
const userSettings = { lang: 'en' };

const settings = { ...defaults, ...userSettings };
console.log(settings); // { theme: 'dark', lang: 'en' }
```

## 异步处理技巧

### async/await 错误处理

使用 try-catch 处理异步错误：

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### Promise.all 并发请求

使用 `Promise.all` 同时发起多个请求：

```javascript
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);

  return { users, posts, comments };
}
```

## 字符串处理技巧

### 模板字符串

使用模板字符串拼接变量：

```javascript
const name = 'Alice';
const age = 25;

// 传统写法
const msg1 = 'Hello, ' + name + '! You are ' + age + ' years old.';

// 模板字符串
const msg2 = `Hello, ${name}! You are ${age} years old.`;
```

### 字符串包含判断

使用 `includes()` 方法判断字符串包含：

```javascript
const str = 'Hello, World!';

console.log(str.includes('World')); // true
console.log(str.startsWith('Hello')); // true
console.log(str.endsWith('!')); // true
```

## 函数技巧

### 默认参数

为函数参数设置默认值：

```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  console.log(`${greeting}, ${name}!`);
}

greet(); // Hello, Guest!
greet('Alice'); // Hello, Alice!
greet('Bob', 'Hi'); // Hi, Bob!
```

### 箭头函数

使用箭头函数简化代码：

```javascript
// 传统函数
const add1 = function(a, b) {
  return a + b;
};

// 箭头函数
const add2 = (a, b) => a + b;

console.log(add1(2, 3)); // 5
console.log(add2(2, 3)); // 5
```

## 性能优化技巧

### 防抖函数

防止函数被频繁调用：

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用示例
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// 只有最后一次调用会执行
handleSearch('a');
handleSearch('ab');
handleSearch('abc'); // 输出: Searching for: abc
```

### 节流函数

限制函数调用频率：

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('Scroll event');
}, 200);

window.addEventListener('scroll', handleScroll);
```

## 结语

这些JavaScript技巧在日常开发中非常实用，掌握它们可以让你写出更简洁、高效的代码。希望本文对你有所帮助！

如果你有其他实用的JavaScript技巧，欢迎分享交流！