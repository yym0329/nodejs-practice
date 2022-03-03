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
    title: '듄 나무위키',
    content:
      '크리스토퍼 놀란은 "지금껏 본 영화중 실사 촬영과 CG 효과 간의 가장 매끄러운 결합을 보여준 영화였다. 모든 면에서 매우 강렬하고 몰입적이다. 엄청난 일을 해냈다."는 평을 내렸다. 2021년 9월 3일 베니스 영화제를 통해 대중에게 처음으로 공개되었다. 드니 빌뇌브 감독이 그려낸 뛰어난 디자인과 한스 짐머가 빚어내는 사운드 역시 훌륭한지라 영상미적인 측면에서는 대체로 높은 평가를 받고 있으나,긴 러닝타임이나 줄거리 분배 문제 등 이외의 부분에 대해서는 평가가 다소 갈린다. 여러모로 감독 드니 빌뇌브의 전작 《블레이드 러너 2049》의 느낌이 난다는 평이 있고 \'우주판 《왕좌의 게임》\' 이라는 평도 있다.[13]기본적으로 작품 내내, 특히 초반에는 인물과 세계관에 대한 설명만이 이어지고 고유명사가 가득하다. 원작에 대한 정보 없이 그저 《스타워즈 시리즈》 같은 우주 활극이라고 생각하고 관람한 사람들 입장에서는 액션씬이 상대적으로 적고 긴 러닝타임 때문에 지루함을 느낄 수 있다.',
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

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches: string[], body: Object.<string, *> | undefined)=>Promise<APIResponse>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: {
        post: posts.map((post) => ({ id: post.id, title: post.title })),
        numberOfContents: posts.length,
      },
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      if (!matches) {
        return {
          statusCode: 404,
          body: 'not found',
        }
      }

      const postId = matches[1]

      if (!postId) {
        return { statusCode: 404, body: 'not found' }
      }

      const postFind = posts.find((_post) => _post.id === postId)

      if (postFind) {
        const post = postFind
        // post 찾음.

        /** @type {APIResponse} */
        const result = {
          statusCode: 200,
          body: post,
        }
        return result
      }

      return {
        statusCode: 404,
        body: 'not found',
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, reqBody) => {
      if (!reqBody) {
        return {
          statusCode: 404,
          body: 'wrong post request',
        }
      }
      if (reqBody.title && reqBody.content) {
        const postId = `post-${posts.length + 1}`
        posts.push(
          /** @type {Post} */
          {
            id: postId,
            title: reqBody.title,
            content: reqBody.content,
          }
        )
        return {
          statusCode: 200,
          body: 'successfully posted',
        }
      }
      return {
        statusCode: 404,
        body: 'wrong post request',
      }
    },
  },
]

module.exports = {
  routes,
}
