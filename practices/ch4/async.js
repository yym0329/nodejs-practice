/* 
@param {number} duration
*/
async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, duration)
  })
} // promise를 return하는 함수는 async함수로 만들 수 있다.

async function main() {
  console.log('first')
  await sleep(1000) // sleep의 실행이 완료될 때까지 코드 진행을 유보함.
  console.log('second')
  await sleep(1000)
  console.log('third')
  await sleep(1000)
}

main()
