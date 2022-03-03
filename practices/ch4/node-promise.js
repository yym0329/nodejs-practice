// @ts-check

const fs = require('fs') // 외부 모듈을 가져올 때 사용. fs라는 외부 모듈을 불러 옴.

/* 
 @param {string} fileName
*/

function readFileInPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}

readFileInPromise('.gitignore')
  .then((value) => {
    console.log(value)
  })
  .catch((error) => {
    console.log('error: ', error)
  })

fs.promises
  .readFile('.gitignore', 'utf-8')
  .then((value) => {
    console.log(value)
  })
  .catch((error) => {
    console.log(error)
  })
