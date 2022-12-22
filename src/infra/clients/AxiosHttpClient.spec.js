import { expect, it, describe, vi, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { AxiosHttpClient } from './AxiosHttpClient'
import { AXIOS_RESPONSE } from '../../tests/mocks'

vi.mock('axios')
const mockAxiosResponse = AXIOS_RESPONSE

describe('AxiosHttpClient', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce(mockAxiosResponse)
  })

  it('call the correct get method with the right params', async () => {
    const url = faker.internet.url()
    const axiosHttpClient = new AxiosHttpClient()

    await axiosHttpClient.get(url)

    expect(axios.get).toHaveBeenCalledWith(url)
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('returns correct value from data axios property', async () => {
    const url = faker.internet.url()
    const axiosHttpClient = new AxiosHttpClient()

    expect(await axiosHttpClient.get(url)).toBe(mockAxiosResponse.data)
  })

  it('throws error for invalid URL', async () => {
    const client = new AxiosHttpClient()
    expect(await client.get('invalid-url')).toThrow(Error)
  })
})
