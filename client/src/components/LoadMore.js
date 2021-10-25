import React, { useState } from 'react'
import { slice, concat } from 'lodash'


const LoadMore = () => {

  const LENGTH = 36
  const DATA = [ ...Array(LENGTH).keys() ]
  // const IMAGE_SRC = 'https://source.unsplash.com/random'
  const LIMIT = 9

  const [ showMore, setShowMore ] = useState(true)
  const [ list, setList ] = useState(slice(DATA, 0, LIMIT))
  const [ index, setIndex ] = useState(LIMIT)

  const LoadMore = () => {
    const newIndex = index + LIMIT
    const newShowMore = newIndex < (LENGTH - 1)
    const newList = concat(list, slice(DATA, index, newIndex))
    setIndex(newIndex)
    setList(newList)
    setShowMore(newShowMore)
  }

  return (
    <>
      {showMore && <button onClick={LoadMore}> Load More </button>}
    </>
  )

}

export default LoadMore