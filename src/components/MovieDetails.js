import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log("movies", movie);

  useEffect(() => {
    // Function to scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: smooth scrolling animation
      });
    };

    // Scroll to top when the component mounts
    scrollToTop();
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "e49d68b55d487658fbdb337d20994be0", // Replace with your TMDb API key
            },
          }
        );
        setMovie(response.data);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchMovieDetails();
  }, [id]);
 
  return (
    <div className=" min-h-screen mt-16 text-gray-800">
      {isLoading ? (
        <div className=" w-full py-16 flex justify-center items-center  ">
          <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : isError ? (
        <div>Error: Failed to fetch movie details.</div>
      ) : !movie ? (
        <div>Movie not found.</div>
      ) : (
        <div className="w-full flex flex-wrap justify-center items-center">
          <div className="relative object-cover">
        
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
           
            <div className="absolute  inset-0 z-10 top-0 bottom-0  sm:bg-gradient-to-r bg-gradient-to-t from-black via-gray-700/10 sm:via-gray-700/50 to-transparent"></div>

            <div className="absolute sm:flex z-10 sm:text-white text-gray-800 sm:top-0 sm:left-0 sm:w-1/2 sm:mx-20 sm:h-full  sm:justify-center sm:items-center">
              <div className="sm:block hidden ">
                <h1 className="sm:text-5xl md:text-3xl text-2xl font-black mt-16 py-10 font-serif  ">
                  {movie.title}
                </h1>
                <div className="space-y-5 ">
                  <p className=" text-lg font-semibold ">{movie.overview}</p>
                  <div className=" flex space-x-5 flex-wrap text-xl font-medium text-zinc-400  ">
                    <p className=" ">IMDb {movie.vote_average.toFixed(1)}</p>
                    <p className="">
                      {Math.floor(movie.runtime / 60)}h{movie.runtime % 60}min
                    </p>
                    <p className="">{movie.release_date.split("-")[0]}</p>
                  </div>

                  <div className="flex flex-wrap">
                    {movie.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="bg-zinc-300 text-gray-800 font-semibold rounded-full px-2 py-1 m-1"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-5/6 ">
            <div className="block pb-10 sm:hidden  ">
              <h1 className="sm:text-5xl md:text-3xl text-2xl font-black py-5 font-serif  ">
                {movie.title}
              </h1>
              <div className="space-y-5 text-gray-600">
                <p className=" text-lg font-semibold ">{movie.overview}</p>
                <div className=" flex space-x-5 flex-wrap text-xl font-medium text-zinc-400  ">
                  <p className=" ">IMDb {movie.vote_average.toFixed(1)}</p>
                  <p className="">
                    {Math.floor(movie.runtime / 60)}h{movie.runtime % 60}min
                  </p>
                  <p className="">{movie.release_date.split("-")[0]}</p>
                </div>
                <div className="flex flex-wrap">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-zinc-300 text-gray-800 font-semibold rounded-full px-2 py-1 m-1"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
