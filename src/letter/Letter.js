import HttpClient from '../infra/clients/HttpClient'
import { ClientRequestError } from '../tests/utils/client-request-error'

export class Letter {
  baseUrl = 'https://jsonplaceholder.typicode.com'
  httpClient
  postsCache

  constructor() {
    this.httpClient = new HttpClient()
    this.postsCache = []
  }

  async get() {
    try {
      const userData = await this.getUsersInfo()
      const user = this.mapUserData(userData)

      const postsData = await this.getPostInfo()
      this.postsCache = [...postsData]

      for (let i = 0; i < user.length; i++) {
        const posts = this.mapPostData(user[i].id)
        user[i].posts = posts
      }

      return user
    } catch (error) {
      throw new ClientRequestError(error)
    }
  }

  mapUserData(users) {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: `${user.address.street}, ${user.address.suite} - ${user.address.zipcode} ${user.address.city}`,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
      posts: [],
    }))
  }

  mapPostData(userId) {
    const filteredPosts = this.postsCache.filter(
      (post) => post.userId === userId
    )

    return filteredPosts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    }))
  }

  async getPostInfo(id) {
    try {
      return await this.httpClient.get(`${this.baseUrl}/posts`)
    } catch (error) {
      throw new ClientRequestError(error.message)
    }
  }

  async getUsersInfo() {
    try {
      return await this.httpClient.get(`${this.baseUrl}/users`)
    } catch (error) {
      throw new ClientRequestError(error.message)
    }
  }
}
