import React from 'react'
import { Link } from 'react-router-dom'

import './header-styles.scss'

export default function index() {
  return (
    <header className="App-header">
        <Link to={'/'}><h1>Movies</h1></Link>
    </header>
  )
}
