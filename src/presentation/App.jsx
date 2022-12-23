import { Letter } from '../letter/Letter'
import { useState, useEffect } from 'react'
import '../styles/app.scss'

const letter = new Letter()

export function App() {
  const [users, setUsers] = useState([])
  const [listPosts, setListPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setIsLoading(true)
      const result = await letter.get()
      setIsLoading(false)
      setUsers(result)
      setListPosts(result[0].posts)
    } catch (error) {
      console.log(error)
      if (error) setErrorMessage(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePost = (posts) => {
    setListPosts([...posts])
  }

  if (errorMessage)
    return (
      <div className="app">
        <div className="error-alert">
          Oops! Something went wrong when trying to bring the data, try again.
        </div>
      </div>
    )

  if (isLoading) return <div className="app">Loadding...</div>

  return (
    <div className="app">
      <div className="container">
        <div className="users">
          <h1>Users</h1>
          {users.length > 0 &&
            users.map((user) => (
              <h2 onClick={() => handlePost(user.posts)} key={user.id}>
                {user.name}
              </h2>
            ))}
        </div>

        <div className="posts scrollbar">
          <h1>Posts</h1>
          <div className="">
            {listPosts.length > 0 &&
              listPosts.map((post) => (
                <div key={post.id}>
                  <h2>
                    {post.id} - {post.title}
                  </h2>
                  <span>{post.body}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
