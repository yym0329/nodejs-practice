/* eslint-disable */
// ts-disable

let user1 = {
  name: 'Youngmin',
  age: 22,
  birthday: '2001-03-29',
}

// No ownership

function changeAge(user, targetAge) {
  let newUser = user
  newUser.age = targetAge
  return newUser
}

let user2 = changeAge(user1, 23)

console.log(user1 === user2)
console.log('user1: ', user1)
console.log('user2: ', user2)

// with ownership

function changeAgeWithKeyOwnership(user, targetAge) {
  /* 
  spread operator: is it shallow copy or deep copy?
  */
  return {
    ...user,
    age: targetAge,
  } // make a new object with the same data of user.
}

console.log('with ownership===========')

user1 = {
  name: 'Youngmin',
  age: 22,
  birthday: '2001-03-29',
}

user2 = changeAgeWithKeyOwnership(user1, 23)

console.log('user1 === user2', user1 === user2)

console.log('user1: ', user1)
console.log('user2: ', user2)
