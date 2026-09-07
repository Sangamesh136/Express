//  Normal function
function sum(a,b){
  return a+b
}

// Arrow function
const val = (a,b)=>{
  return a+b
}

// map function
// find square of all elements

function squ(a){
  return a*a
}

arr = [1,2,3,4,5]
arr2 = arr.map(squ) 
console.log(arr2)
arr2 = arr.map(num => num*num)
console.log(arr2)

// filter function
// filters the elements based on the required content
function filtering(n){
  return n%2==0
}

arr3 = arr.filter(filtering)
console.log(arr3)