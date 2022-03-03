// @ts-nocheck
/* eslint-disable */

;(() => {
  // practices/ch4/main.js
  var arr = [
    {
      foo: {
        bar: 10,
      },
    },
    {},
    { foo: {} },
  ]
  console.log(
    arr.map((obj) => {
      var _a
      return (_a = obj == null ? void 0 : obj.foo) == null ? void 0 : _a.bar
    })
  )
})()
