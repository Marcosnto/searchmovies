import React from 'react'

import './search-styles.scss';

export default function index() {
  return (
    <div className="search-bar">
      <input 
        className="search__input"
        type="text" 
        id="search" 
        placeholder="Busque um filme por nome, ano ou gênero"
      />
    </div>
  )
}
