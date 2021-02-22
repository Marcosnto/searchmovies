import React from 'react'

import './search-styles.scss';

export default function index({onChange, value}) {

  function setWord(e) {
    onChange(e.target.value);
  }

  return (
    <div className="search-bar">
      <input 
        className="search__input"
        type="text" 
        valeu={value}
        onChange={setWord}
        id="search" 
        placeholder="Busque um filme por nome, ano ou gênero"
      />
    </div>
  )
}
