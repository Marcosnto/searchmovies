import React from 'react'
import SearchBar from '../../components/SearchBar'
import MovieCard from '../../components/MovieCard'

import './home-styles.scss'

export default function index() {
  return (
    <div>
      <header className="App-header">
        <h1>Movies</h1>
      </header>
      <body>
        <SearchBar />
        <MovieCard />
      </body>
    </div>
  )
}
