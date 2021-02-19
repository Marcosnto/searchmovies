import React from 'react';

import './movie-styles.scss';
import HP from '../../assets/hp.jpg';

export default function index() {
  return (
    <div className="movie__card" width="300px">
      <img src={HP}/>
      <div>
        <ul>
          <li>
            Title
          </li>
          <li>
            %
            data
          </li>
          <li>
            Text
          </li>
          <li>
            tags
          </li>
        </ul>
      </div>
    </div>
  )
}
