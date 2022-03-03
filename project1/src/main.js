// @ts-check
/* 
Post

GET /posts
GET /posts/:id

POST /posts 

*/

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'first-id',
    title: 'first title',
    content: 'first content',
  },
  {
    id: 'second-id',
    title: 'second title',
    content: 'second content',
  },
  {
    id: 'third-id',
    title: 'third title',
    content: 'third content',
  },
  {
    id: 'fourth id',
    title: 'fourth title',
    content: 'fourth content',
  },
]

const http = require('http')

const server = http.createServer((req, res) => {
  // req는 request와 관련된 것들,
  // res는 server response와 관련된 것들
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  // capture group 설정: 캡쳐할 그룹을 소괄호로 감싸주면 됨.
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  function notFoundError() {
    res.statusCode = 404
    res.end('Not found')
  }

  function endResponse(statusCode, isSetHeader, responseBody) {
    /**
     * @param {number} statusCode
     * @param {boolean} isSetHeader
     * @param {any} responseBody
     */
    res.statusCode = statusCode
    if (isSetHeader === true) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
    }
    res.end(JSON.stringify(responseBody))
  }

  if (req.method === 'GET') {
    if (req.url === '/posts') {
      // GET/posts
      /* ===================================
        shows a list of posts
      */

      const result = {
        posts: posts.map((post) => ({
          postId: post.id,
          title: post.title,
        })),

        totalNumberOfPosts: posts.length,
      }
      /* 
json 파일로 response가 나간다는 것을 헤더로 명시해준다.
*/
      endResponse(200, true, result)
    } else if (postIdRegexResult) {
      // GET/posts/:id
      /* ===================================
      searching a certain post with post id
      
      */
      const postId = postIdRegexResult[1]

      const post = posts.find((_post) => _post.id === postId)

      if (post) {
        endResponse(200, true, post)
      } else {
        endResponse(404, false, 'cannot find requested post')
      }
    } else {
      endResponse(404, false, 'cannot find requested post')
    }
  } else if (req.method === 'POST') {
    if (req.url === '/posts') {
      // POST/posts
      req.setEncoding('utf-8')

      req.on('data', (data) => {
        /**
         * @typedef CreatePostBody
         * @property {string} title
         * @property {string} content
         */

        /**
         * @type {CreatePostBody}
         */
        const body = JSON.parse(data)
        console.log(body)

        posts.push(
          /** @type {Post} */
          {
            id: `${posts.length + 1}`,
            title: body.title,
            content: body.content,
          }
        )
      })

      endResponse(200, false, 'uploading the post')
    } else {
      endResponse(404, false, 'cannot find requested post')
    }
  } else {
    endResponse(404, false, 'cannot find requested post')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at: ${PORT}`)
})
