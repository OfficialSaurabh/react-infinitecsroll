// UserList.js
import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ movies }) => {
  if (!movies) {
    // Handle the case when movies is undefined (e.g., during initial loading).
    return null;
  }
  return (
    <div className=" flex flex-wrap justify-center gap-5 w-3/4 m-auto pt-36">
      {movies.map(movie => (
        <div key={movie.index} className=" ">
          <div className="">
            <Link to={`/movie/${movie.id}`}>
              <img
              className="rounded-md shadow-md overflow-hidden hover:shadow-2xl "
                src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              {/* <p className="text-red-700">{`${movie.title}`}</p> */}
              <p>{`${movie.id}`}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
