import { expect, it, describe, vi, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import HttpClient from './HttpClient'
import { AXIOS_RESPONSE } from '../../tests/mocks'

vi.mock('axios')
const mockAxiosResponse = AXIOS_RESPONSE

describe('HttpClient', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce(mockAxiosResponse)
  })

  it('call the correct get method with the right params', async () => {
    const url = faker.internet.url()
    const httpClient = new HttpClient()

    await httpClient.get(url)

    expect(axios.get).toHaveBeenCalledWith(url)
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('returns correct value from data axios property', async () => {
    const url = faker.internet.url()
    const httpClient = new HttpClient()

    expect(await httpClient.get(url)).toBe(mockAxiosResponse.data)
  })

  it('throws error for invalid URL', async () => {
    const client = new HttpClient()
    expect(await client.get('invalid-url')).toThrow(Error)
  })
})
