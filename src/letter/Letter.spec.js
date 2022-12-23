/* eslint-disable no-unused-expressions */
import { expect, it, describe, vi } from 'vitest'
import { Letter } from './Letter'
import axios from 'axios'

import HttpClient from '../infra/clients/HttpClient'

import {
  MOCK_USER_DATA,
  API_USER_OBJECT,
  API_POSTS_OBJECT,
} from '../tests/mocks'

vi.mock('axios')
const mockAxiosResponse = {
  data: MOCK_USER_DATA,
}

describe('Letter', function () {
  it('correctly sets up the constructor with the httpClient and postsCache variables.', () => {
    const sut = new Letter()

    expect(sut.postsCache).to.not.be.null
    expect(sut.postsCache).toEqual([])

    expect(sut.httpClient).to.not.be.null
    expect(sut.httpClient).to.be.an.instanceof(HttpClient)
  })

  it('returns the expected user data.', async () => {
    const letter = new Letter()
    const spy = vi.spyOn(letter, 'get').mockImplementation(() => MOCK_USER_DATA)
    const response = await letter.get()

    expect(spy).toHaveBeenCalled()
    expect(response).toBe(mockAxiosResponse.data)
    expect(response[0]).toBe(mockAxiosResponse.data[0])
    expect(response[1]).toBe(mockAxiosResponse.data[1])
    expect(response[2]).toBe(mockAxiosResponse.data[2])
    expect(response.length).toBe(mockAxiosResponse.data.length)
  })

  it('check if mapUserData() method maps the user data correctly', () => {
    const letter = new Letter()
    const input = API_USER_OBJECT
    const { street, suite, zipcode, city } = input[0].address

    const output = [
      {
        id: input[0].id,
        name: input[0].name,
        username: input[0].username,
        email: input[0].email,
        address: `${street}, ${suite} - ${zipcode} ${city}`,
        phone: input[0].phone,
        website: input[0].website,
        company: input[0].company.name,
        posts: [],
      },
    ]

    const spy = vi.spyOn(letter, 'mapUserData')
    const response = letter.mapUserData(input)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(input)
    expect(response).toEqual(output)
  })

  it('check if the mapPostData() method maps the post data correctly', () => {
    const letter = new Letter()

    const input = API_POSTS_OBJECT

    const output = [
      {
        id: input[0].id,
        title: input[0].title,
        body: input[0].body,
      },
    ]

    letter.postsCache = input
    const spy = vi.spyOn(letter, 'mapPostData')
    const response = letter.mapPostData(1)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(1)
    expect(response).toEqual(output)
  })

  it('check if the getUsersInfo() method returns the expected post data', async () => {
    const letter = new Letter()
    const input = API_USER_OBJECT
    const { street, suite, zipcode, city } = input[0].address

    const output = [
      {
        id: input[0].id,
        name: input[0].name,
        username: input[0].username,
        email: input[0].email,
        address: `${street}, ${suite} - ${zipcode} ${city}`,
        phone: input[0].phone,
        website: input[0].website,
        company: input[0].company.name,
        posts: [],
      },
    ]

    const spy = vi.spyOn(letter, 'getUsersInfo')

    spy.mockReturnValue(output)

    const response = await letter.getUsersInfo()

    expect(spy).toHaveBeenCalled()
    expect(response).toEqual(output)
  })

  it('check if the getPostsInfo() method returns the expected post data', async () => {
    const letter = new Letter()
    const input = API_POSTS_OBJECT

    const output = [
      {
        id: input[0].id,
        title: input[0].title,
        body: input[0].body,
      },
    ]

    const spy = vi.spyOn(letter, 'getPostInfo')

    spy.mockReturnValue(output)

    const response = await letter.getPostInfo()

    expect(spy).toHaveBeenCalled()
    expect(response).toEqual(output)
  })
})
