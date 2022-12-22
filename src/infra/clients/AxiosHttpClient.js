import axios from 'axios'

export class AxiosHttpClient {
  async get({ url, params }) {
    const result = await axios.get(url, { params })
    return result.data
  }
}
