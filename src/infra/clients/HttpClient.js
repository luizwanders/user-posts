import { AxiosHttpClient } from './AxiosHttpClient'

const clientAdapter = new AxiosHttpClient()

export default class HttpClient {
  async get(url, params = {}) {
    return await clientAdapter.get({ url, params })
  }
}
