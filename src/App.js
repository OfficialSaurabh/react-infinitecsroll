import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const API_KEY = "c59c943576ee5ade1e6c794e05dce553"; // Replace with your TMDb API key

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [stuckOnPage, setStuckOnPage] = useState(null);
  const bottomBoundaryRef = useRef(null);
  console.log(`"page": ${page}`);
  const fetchMovies = async () => {
    if (isLoading || isError || noMoreData) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: API_KEY,
            page: page,
            sort_by: "popularity.desc",
          },
        }
      );
      const newMovies = response.data.results;
      if (page === 500) {
        // If no new movies were fetched, set noMoreData to true
        setNoMoreData(true);
      } else {
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        // setPage((prevPage) => prevPage + 1);
      }
      setIsLoading(false);
      setStuckOnPage(null);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setStuckOnPage(page);
    }
  };
  const handleScroll = () => {
  
    const windowRelativeBottom = document.documentElement.getBoundingClientRect()
    .bottom;
  if (windowRelativeBottom <= document.documentElement.clientHeight + 100 && page < 500)  {
    setPage(prevPage => prevPage + 1);
  }
  };
  useEffect(() => {
    fetchMovies();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <Router>
      <div className=" b-10 bg-gray-100 min-h-screen ">
        <h1 className=" top-0 z-10 fixed w-full text-center p-5 text-2xl font-bold tracking-widest text-gray-800 bg-white border-b-2 border-gray-500  shadow-lg shadow-gray-500/50  ">
          ReactJs Infinite Scroll
        </h1>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        {/* <button onClick={changePage} >load more</button> */}
        {isLoading && (
          <div className=" w-full flex justify-center items-center  ">
            <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {isError && (
          <div className="text-red-400 flex justify-center items-center  text-2xl">
            Error loading data...
          </div>
        )}
        {noMoreData && (
          <div className="text-red-500 flex justify-center items-center text-2xl">No more movies left.</div>
        )}
        {stuckOnPage !== null && (
          <div className="text-red-400 flex justify-center items-center  text-2xl">
            Fetching data got stuck on page {stuckOnPage}. Please try again
            later.
          </div>
        )}
        <div ref={bottomBoundaryRef}  />
      </div>
    </Router>
  );
}

export default App;
