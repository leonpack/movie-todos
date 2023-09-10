import { useState } from "react";
import Logo from "./components/Logo";
import MovieList from "./components/MovieList";
import Form from "./components/Form";
import Stats from "./components/Stats";

export default function App() {
  const [movies, setMovies] = useState([]);

  function handleAddMovie(movie) {
    setMovies((movies) => [...movies, movie]);
  }

  function handleDeleteMovie(movieTitle) {
    setMovies(movies.filter((movie) => movie.movieTitle !== movieTitle));
  }

  function handleToggleMovie(movieTitle) {
    setMovies((movies) =>
      movies.map((movie) =>
        movie.movieTitle === movieTitle
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  }

  function handleSorted() {
    setMovies((movies) =>
      movies.slice().sort((a, b) => a.movieTitle.localeCompare(b.movieTitle))
    );
  }

  function handleClearMovieList() {
    const confirmOption = window.confirm("Bạn có chắc muốn xoá toàn bộ phim ?");
    if (confirmOption) {
      setMovies([]);
    }
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddMovie={handleAddMovie} />
        <MovieList
          movies={movies}
          onDeleteMovie={handleDeleteMovie}
          onToggleMovie={handleToggleMovie}
          onClearList={handleClearMovieList}
          onSort={handleSorted}
        />
        <Stats movies={movies} />
      </div>
    </>
  );
}
