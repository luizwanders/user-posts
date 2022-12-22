import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { Letter } from './letter/Letter'

const letter = new Letter()

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const result = await letter.get()
    setUsers(result)
  }

  return (
    <div className="App">
      {users.length > 0 &&
        users.map((user) => <h1 key={user.id}>{user.name}</h1>)}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
