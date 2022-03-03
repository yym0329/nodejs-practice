/* eslint-disable */
// @ts-ignore

/* 
promise: Javascript의 비동기 코드 실행 방식.
*/

/* const { createImportSpecifier } = require('typescript')

new Promise((resolve, reject) => {
  console.log('inside promise')
  console.log('before resolve')
  resolve('first resolve')
  console.log('after resolve') // promise는 일단 자기 자신의 콜스택은 다 비운다.
  reject(new Error('First reject')) // promise의 값이 reject로 결정된다. 이후에 resolve를 해도 promise의 내부값을 reject에서 resolve로 바꾸지 못한다.
}) // promise 내부 블록 실행이 끝난 후에 promise의 내부값이 resolve인지 reject인지에 따라 서로 다른 handler, catch와 then을 실행하게 된다.
  .catch((error) => {
    console.log('error hi', error)
  })
  .then((value) => {
    console.log('Inside first then')
    console.log('value', value) // value는 promise에서 resolve한 값임.
  }) */

/* function returnPromiseForTimeout() {
  return new Promise((resolve, reject) => {
    console.log('Before timeout in function')
    setTimeout(() => {
      resolve(Math.random())
      console.log('After resolve in function')
    }, 1000)
  })
}

new Promise((resolve, reject) => {
  console.log('Before timeout')
  setTimeout(() => {
    resolve(Math.random())
    console.log('After resolve')
  }, 1000)
})
  .then((value) => {
    console.log('value ', value)
    return returnPromiseForTimeout() // promise를 return해서, 이 promise가 resolve될 때까지 기다린 후에 다음 then chain이 실행될 것임.
  })
  .then((value) => {
    console.log('value ', value)
    return returnPromiseForTimeout()
  })
  .then((value) => {
    console.log('value ', value)
    return returnPromiseForTimeout()
  })
  .then((value) => {
    console.log('value ', value)
    return returnPromiseForTimeout()
  }) */
// 비동기 코드의 순차적 실행

// promise없이 구현

const arr = [
  {
    foo: {
      bar: 10,
    },
  },

  {},
  { foo: {} },
]

console.log(arr.map((obj) => obj?.foo?.bar))
