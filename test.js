// const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']

// /**
//  * Filter array items based on search criteria (query)
//  */
// // const filterItems = (arr, query) => {
// //   return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
// // }

// // console.log(filterItems(fruits, 'ap'))  // ['apple', 'grapes']
// // console.log(filterItems(fruits, 'an'))  // ['banana', 'mango', 'orange']

// let res = fruits.filter(item => item.indexOf('apple') !== -1);
// console.log(res);


const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);