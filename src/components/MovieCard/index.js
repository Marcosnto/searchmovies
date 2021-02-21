import React from 'react';
import { Link } from 'react-router-dom';

import './movie-styles.scss';

const base_URL_img = 'https://image.tmdb.org/'

export default function Index({ moviesData }) {

  function getPorcentage(porcentage) {
    return Math.trunc(porcentage) + '%'
  }
  console.log('recebi: ', moviesData);

  return (
    <div className="movie__card" width="300px">
      <img src={`${base_URL_img}t/p/w500/${moviesData?.poster_path}`} alt="teste"/>
      <div className="movie_details">
        <Link to="/movie-detail">
          <div className="movie_details-title">
          <span className="score"><span>{getPorcentage(moviesData?.popularity)}</span></span>
          <h2>{moviesData?.original_title}</h2>
          </div>
        </Link>
        <ul className="movie_details-card">
          <li className="movie_details--score_date date">
            {moviesData?.release_date}
          </li>
          <li className="movie_details-description">
            <p className="movie_description-text">{moviesData?.overview}</p>
            <div className="movie_details-tags">
              {moviesData?.genres?.map((tag) => {
              return <span>{tag.name}</span>
              })}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
