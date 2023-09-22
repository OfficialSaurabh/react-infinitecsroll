import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log("movie details", movie);

  useEffect(() => {
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

  // console.log(movie);

  return (
    <div className="h-screen text-gray-800">
      {isLoading ? (
        <div className=" w-full flex justify-center items-center  ">
          <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : isError ? (
        <div>Error: Failed to fetch movie details.</div>
      ) : !movie ? (
        <div>Movie not found.</div>
      ) : (
        <div className="">
          <div className=" ">
            <div
              className=" min-h-screen sm:py-5 px-2 md:py-8 items-center "
              style={{
                backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,

                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="bg-black bg-opacity-60 text-white absolute inset-0  flex flex-col items-center justify-end">
                <div className="sm:w-3/4 w-full mx-auto px-2">
                  <div className=" mb-28  space-y-5 ">
                    <h1 className="text-4xl font-bold  ">{movie.title}</h1>
                    <p className=" text-xl ">{movie.overview}</p>

                    <div className="flex flex-wrap">
                      {movie.genres.map(genre => (
                        <span
                          key={genre.id}
                          className="bg-gray-300 text-gray-800 rounded-full px-2 py-1 m-1"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 w-3/4 mx-auto">
              <p className="text-xl font-bold">{movie.title}</p>
              {/* Add more movie details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
