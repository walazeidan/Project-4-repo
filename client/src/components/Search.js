import React, { useEffect, useState } from 'react'

const Search = ({ titles, setFilteredTitles, filters, setFilters }) => {

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    console.log('New Obj', newObj)
    setFilters(newObj)
  }

  const handleGenres = (e) => {
    const filteredArray = titles.filter(country => country.region === e.target.value)
    console.log(setFilteredTitles(filteredArray))
  }

  return (
    <>
      <input onChange={handleFilterChange} name="searchTerm" value={filters.searchTerm} className="search" placeholder="🔎 Search Titles"/>
      <select onChange={handleGenres} value={filters.genres} className='sort'>
        <option value="all" defaultValue>All</option>
        <option value="Thriller">Thriller</option>
        <option value="Coming-of-Age">Coming-of-Age</option>
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
        <option value="Fantasy">Fantasy</option>
      </select>
    </>
  )








}

export default Search