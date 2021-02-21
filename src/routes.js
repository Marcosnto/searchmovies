import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails'

export default function routes() {
  return (
    <Switch className="App">
      <Route path="/" exact component={Home} />
      <Route path="/movie-detail" component={MovieDetails}/>
    </Switch>
  )
}
