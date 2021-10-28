import React, { useEffect, useState } from 'react'

const Search = ({ titles, setFilteredTitles, filters, setFilters, handleFilters }) => {

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    console.log('New Obj', newObj)
    setFilters(newObj)
  }


  // const handleFilters = (e) => {
  //   const filteredGenres = titles.map(t => t.genres.map(g => g.name === e.target.value))
  //   console.log(setFilteredTitles(filteredGenres))
  // }

  // const Filters = ({ })

  return (
    <>
      <input onChange={handleFilterChange} name="searchTerm" value={filters.searchTerm} className="search" placeholder="🔎 Search Titles"/>
      <select onChange={handleFilters} className='sort'>
        <option value="all" defaultValue>All</option>
        <option value="Thriller">Thriller</option>
        <option value="Coming-Of-Age">Coming-of-Age</option>
        <option value="Romance">Romance</option>
        <option value="Comedy">Comedy</option>
        <option value="Mystery">Mystery</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Horror">Horror</option>
        <option value="Drama">Drama</option>
        <option value="Crime">Crime</option>
        <option value="Dystopia">Dystopia</option>
        <option value="Biography">Biography</option>
        <option value="Psychological Thriller">Psychological Thriller</option>
        {/* <option value="Fantasy">Fantasy</option> */}
      </select>
    </>
  )








}

export default Search