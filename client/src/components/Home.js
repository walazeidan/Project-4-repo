import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Home = () => {
  return (
    <>
      <div className="home-background">
        <p className='home-about'>Think the movie didnt do the book justice? <br/>
        Did the movie take the story to the next level? <br/>
        Share your thoughts and Find out what others think!
        </p>
      </div>
      <div className='big-btn'>
        <Link className="explore-btn" to="/adaptations"><span>Explore Titles</span> </Link>
      </div>
    </>
  )
}

export default Home

