/* eslint-disable */

function deepCopyObject(src) {
  let result = {}
  if (typeof src == 'object' && src != null) {
    // reference type data. needs special deep copying.
    for (let prop in src) {
      // for in은 object에서 key만 가져 온다.
      result[prop] = deepCopyObject(src[prop])
    }
  } else {
    result = src
  }
  return result
}

var user1 = {
  name: 'youngmin yu',
  age: 21,
  education: {
    elementarySchool: '푸른초등학교',
    middleSchool: '능동중학교',
    highSchool: '동탄고등학교',
    university: 'KAIST',
  },
}

var user2 = deepCopyObject(user1)
console.log(user2)

console.log('user1 === user2: ', user1 === user2)
console.log(
  'user1.education === user2.education: ',
  user1.education === user2.education
)

user2.age = 22
user2.education.university = 'SNU'

console.log('user1: ', user1)
console.log('user2: ', user2)
