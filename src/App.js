import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserList } from './redux/actions'
import UserCard from './components/UserCard'

function App() {
  const dispatch = useDispatch()
  const userList = useSelector(state => state)
  const [page, setPage] = useState(1)
  const [randomUser, setRandomUser] = useState("Sargis Levon")
  const limit = 5
  const quantity = userList.length
  const maxPage = Math.ceil(quantity / limit)
  const filteredUserList = userList.filter((_, index) => (index < limit * page) && (index >= limit * page - limit))

  useEffect(() => {
    dispatch(fetchUserList())
  }, [dispatch])

  useEffect(() => {
    function pickRandomContact() {
      const randomNumber = Math.floor(Math.random() * quantity)
      const newRandomUser = `${userList[randomNumber].surname} ${userList[randomNumber].name}`
      return newRandomUser
    }
    let timer = setInterval(() => setRandomUser(pickRandomContact()), 8000)
    return () => clearInterval(timer)
  }, [userList, quantity])

  function pageChangeHandler(value) {
    if (isNaN(+value) || (+value < 1) || (+value >= maxPage + 1)) return false //validation
    setPage(+value)
  }

  return (
    <div className="app">
      <header>
        <h1>User List</h1>
        <p>Random User: <span>{randomUser}</span></p>
      </header>
      <main>
        <ul>
          <li className="title">
            <p className="name">Name</p>
            <p className="desc">Description</p>
          </li>
          {filteredUserList && filteredUserList.map(user => <UserCard key={user.id} user={user} />)}
        </ul>
      </main>
      <footer>
        <p>Page {page} from {maxPage}</p>
        <div>
          <input type="button" value="prev" onClick={() => pageChangeHandler(page - 1)} />
          <input type="text" value={page.toString()} onChange={(e) => pageChangeHandler(e.target.value)} />
          <input type="button" value="next" onClick={() => pageChangeHandler(page + 1)} />
        </div>
      </footer>
    </div>
  );
}

export default App