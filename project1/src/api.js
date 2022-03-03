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

const fs = require('fs')

const DB_JSON_PATH = 'project1/database.json'
/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile(DB_JSON_PATH, 'utf-8')
  return JSON.parse(json).posts
}

/**
 * @param {Post[]} posts
 */
async function savePosts(posts) {
  const content = {
    posts,
  }
  return fs.promises.writeFile(DB_JSON_PATH, JSON.stringify(content), 'utf-8')
}

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
        post: await getPosts(),
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

      const postFind = await (
        await getPosts()
      ).find((post) => post.id === postId)

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
          statusCode: 400,
          body: 'wrong post request',
        }
      }
      if (reqBody.title && reqBody.content) {
        const posts = await getPosts()
        const postId = `post-${posts.length + 1}`
        /** @type {Post} */
        const newPost = {
          id: postId,
          title: reqBody.title,
          content: reqBody.content,
        }
        posts.push(newPost)
        await savePosts(posts)
        return {
          statusCode: 200,
          body: { message: 'successfully posted', post: newPost },
        }
      }
      return {
        statusCode: 400,
        body: 'wrong post request',
      }
    },
  },
]

module.exports = {
  routes,
}
