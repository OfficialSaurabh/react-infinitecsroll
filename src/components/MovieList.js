// UserList.js
import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ movies }) => {
  console.log(movies);
  if (!movies) {
    // Handle the case when movies is undefined (e.g., during initial loading).
    return null;
  }

  return (
    //   <div className=" flex flex-wrap justify-center gap-5 w-3/4 m-auto pt-36">
    //   {movies.map(movie => (
    //     <div key={movie.index} className=" ">
    //       <div className="">
    //         <Link to={`/movie/${movie.id}`}>
    //           <img
    //           className="rounded-md shadow-md overflow-hidden hover:shadow-2xl "
    //             src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
    //             alt={movie.title}
    //           />
    //           {/* <p className="text-red-700">{`${movie.title}`}</p> */}
    //           <p>{`${movie.id}`}</p>
    //         </Link>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className=" pb-10 grid px-2 place-items-center grid-cols-2 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 w-full lg:w-3/4 m-auto  pt-36">
      {movies.map(movie => (
        <div key={movie.index} className=" ">
          <div className="overflow-hidden w-48 rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card">
            <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900/90 to-transparent"></div>
            <Link to={`/movie/${movie.id}`}>
              <div className="relative cursor-pointer group z-10 px-5 pb-5 space-y-6">
                <div className="w-full h-72  flex flex-col justify-end">
                  <div className="space-y-6 mt-4">
                    <div className="flex flex-col justify-start space-y-2 inner">
                      <h3
                        className="text-xl font-bold text-white"
                        data-unsp-sanitized="clean"
                      >
                        {`${movie.title}`}
                      </h3>
                      <div className="mb-0 text-lg text-gray-400">
                        {new Date(movie.release_date).toDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }) ?? ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <img
              className="absolute object-fill inset-0 transform w-full h-full -translate-y-4"
              alt="sdf"
              src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
