// @ts-check

const http = require('http')

const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Error: Request not found')
      return
    }
    // ROUTE 찾은 경우
    const regExpResult = route.url.exec(req.url)
    if (!regExpResult) {
      res.statusCode = 404
      res.end('Error: Request not found')
      return
    }

    // POST method 용 post data 골라내기
    /** @type {Object.<string, *> | undefined} */
    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('Ill-formed data'))
            }
          })
        }))) ||
      undefined

    const result = await route.callback(regExpResult, reqBody)

    if (!result) {
      res.statusCode = 404
      res.end('something went wrong')
      return
    }

    res.statusCode = result.statusCode
    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }
  main()
})

const PORT = 4000

server.listen(PORT, () => {
  // console.log(`The server is listening at: ${PORT}`)
})
