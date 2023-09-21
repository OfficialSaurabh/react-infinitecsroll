// UserList.js
import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ movies }) => {
  if (!movies) {
    // Handle the case when movies is undefined (e.g., during initial loading).
    return null;
  }
  return (
    <div className="user-list">
      {movies.map((movie) => (
        <div key={movie.index} className="user">
          <Link to={`/movie/${movie.id}`}>
            <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title} />
            <p>{`${movie.title}`}</p>
            <p>{`${movie.id}`}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
