import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './Search'
import LoadMore from './LoadMore'
import { Link } from 'react-router-dom'



const List = ({ showMore, LoadMoreButton }) => {
  
  const [ titles, setTitles ] = useState([])
  const [ hasError, setHasError ] = useState(false)
  const [ filteredTitles, setFilteredTitles ] = useState([])
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
    console.log(filteredTitles)
  }, [setFilteredTitles, filters, titles])


  return (
    <div className="rn">
      <div className="search-filter">
        <Search titles={titles} setFilteredTitles={setFilteredTitles} filters={filters} setFilters={setFilters}/>
      </div>
      <div className="titles-page">
        {(filteredTitles.length > 0 ?
          filteredTitles : titles).map(title => {
          return (
            <>
              <>
                <div className='card col-lg-3 mb-4 col-md-6'>
                  <Link to={`/adaptations/${title.id}/`}>
                    <h4 className="title-name" value={title.name}>{title.name}</h4>
                    <img className="title-image" src={title.book_image}></img>
                  </Link>
                </div>
              </>
            </>
          )
        })
        }
      </div>
      {/* {showMore && <button onClick={LoadMoreButton}> Load More </button>} */}
      {/* <LoadMore /> */}
    </div>
  )
}

export default List