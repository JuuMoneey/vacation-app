import React, { useState } from 'react'


const Searchbar = () => {
    const [searchWord, setSearchWord] = useState('')

const handleChange = (e) => {
    setSearchWord(e.target.value)
}

const handleSubmit = (e) => {
e.preventDefault();

setSearchWord('');
}

  return (
   <div>
    <form onSubmit={handleSubmit}>
    <input type = "text" placeholder = "Search" value={searchWord} onChange={handleChange}/>
    <button type="submit">Search</button>
    </form>
   </div>
  )
}

export default Searchbar;
