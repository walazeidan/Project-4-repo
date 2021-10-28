import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './Search'
import LoadMore from './LoadMore'
import { Link } from 'react-router-dom'
import { userIsAuthenticated } from './Auth'



const List = ({ showMore, LoadMoreButton }) => {
  
  const [ titles, setTitles ] = useState([])
  const [ hasError, setHasError ] = useState(false)
  const [ filteredTitles, setFilteredTitles ] = useState({})
  const [ filters, setFilters ] = useState({ genre: 'All' ,searchTerm: '' })

  
  useEffect(() => {
    const getTitles = async () => {
      try {
        const { data } = await axios('/api/adaptations')
        setTitles(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getTitles()
  }, [])

  

  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredTitles(titles.filter(title => {
      // if (titles.genres) {
      return regexSearch.test(title.name) 
      // && (title.genres.filter(name => name.includes(filters.genres)) || filters.type === 'All')
      // }
    }))
  }, [setFilteredTitles, filters, titles])


  
  const handleFilters = (e) => {
    let handleTrue = []
    // map through titles each title we map through as well
    const newFilter = titles.map(t => {
      let trueOrFalse = []
      // genre if it matches e.target.value returns true or false
      t.genres.map(g => {
        if (g.name === e.target.value) {
          // return <p>g.name</p>
          console.log(g.name === e.target.value)
          trueOrFalse.push(g.name === e.target.value)
          console.log(e.target.value)
          // return <p>{e.target.value}</p>
        }
      }),
      // spreads and adds that true value if 
      handleTrue = [...handleTrue, trueOrFalse]
      trueOrFalse = []
      console.log(handleTrue, 'handle true')
    })
    console.log(newFilter, 'new one')
    console.log(handleTrue, ' handle')
    let filteredObjects = []
    let counter = 0
    // map through and checks whether it's true, if it is it pushes that movie into filtered objects. 
    titles.map(movie => {
      if (handleTrue[counter][0] === true) { 
        filteredObjects.push(movie)
      }
      counter = counter += 1
    })
    // if it's all filtered objetcs is equal to all titles. 
    if (e.target.value === 'all') { 
      filteredObjects = titles
    }
    
    setFilteredTitles(filteredObjects)
    console.log('filtered generes data', filteredObjects)
  }


  // const headings = (text) => {
  //   if (e.target.value === 'All') {
  //     return (
  //       <div className="All">
  //         <p>All</p>
  //       </div>
  //     )
  //   }
  // }

  // const genreName = () => {
  //   titles.map(t => {
  //     t.map(g => g.name)
  //   })
  // }


  return (
    <div className="rn">
      <div className="search-filter">
        <Search titles={titles} setFilteredTitles={setFilteredTitles} filters={filters} setFilters={setFilters} handleFilters={handleFilters}/>
      </div>
      <div className="all-titles">
        <div className="titles-page">
          {(filteredTitles.length > 0 ?
            filteredTitles : titles).map(title => {
            return (
              <>
                <>
                  {/* {genreName} */}
                  <div className='card col-lg-3 mb-4 col-md-6' key={title.name}>
                    {userIsAuthenticated() ?
                      <Link to={`/adaptations/${title.id}/`}>
                        <h4 className="title-name" value={title.name} key={title.name}>{title.name}</h4>
                        <img className="title-image" src={title.book_image} key={title.book_image}></img>
                      </Link>
                      :
                      <Link to={'/login'}>
                        <h4 className="title-name" value={title.name} key={title.name}>{title.name}</h4>
                        <img className="title-image" src={title.book_image} key={title.book_image}></img>
                      </Link>
                    }
                  </div>
                </>
              </>
            )
          })
          }
        </div>
      </div>
      {/* {showMore && <button onClick={LoadMoreButton}> Load More </button>} */}
      {/* <LoadMore /> */}
    </div>
  )
}

export default List