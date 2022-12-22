import axios from 'axios'

export class AxiosHttpClient {
  async get(url) {
    const result = await axios.get(url)
    return result.data
  }
}
