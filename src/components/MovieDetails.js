
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "c59c943576ee5ade1e6c794e05dce553", // Replace with your TMDb API key
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
    <div className="movie-details">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: Failed to fetch movie details.</div>
      ) : !movie ? (
        <div>Movie not found.</div>
      ) : (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          {/* Add more movie details as needed */}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
