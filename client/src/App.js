import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import List from './components/List'
import TitleCard from './components/TitleCard'
import Login from './components/Login'
import Register from './components/Register'
import ReviewForm from './components/ReviewForm'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/adaptations'>
          <List />
        </Route>
        <Route exact path='/adaptations/:id'>
          <TitleCard />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/adaptations/:id/reviews'>
          <ReviewForm />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
