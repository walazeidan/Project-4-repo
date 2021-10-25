import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* <div className="site-wrapper"> */}
      <div className="home-background">
        <p>Think the movie didnt do the book justice? <br/>
        or did the movie take the story to the next level? <br/>
        Let us know and Find out what others thing!
        </p>
      </div>
      <div className='big-btn'>
        <Link className="explore-btn" to="/adaptations"><span>Explore Titles</span> </Link>
      </div>
      <div className="upcoming-container">
        <span className="upcoming-text">Read these upcoming adaptations</span>
        <div className="upcoming">
          <a href='https://untappd.com/' rel="noreferrer" target="_blank">
            <div className="dune">
            </div>
          </a>
          <a href='https://untappd.com/' rel="noreferrer" target="_blank">
            <div className="my-year-of-rest">
            </div>
          </a>
          <a href='https://untappd.com/' rel="noreferrer" target="_blank">
            <div className="crawdads">
            </div>
          </a>
          <a href='https://untappd.com/' rel="noreferrer" target="_blank">
            <div className="vampire">
            </div>
          </a>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Home

