import { useState } from "react";

// const movieData = [
//   {
//     movieTitle: "Life Of Pi",
//     watched: false,
//   },
//   {
//     movieTitle: "One Piece 2023",
//     watched: true,
//   },
// ];

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
    setMovies(movies => movies.slice().sort((a,b) => a.movieTitle.localeCompare(b.movieTitle)))
  }

  function handleClearMovieList() {
    setMovies([]);
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
          onSort = {handleSorted}
        />
        <Stats movies={movies} />
      </div>
    </>
  );
}

function Logo() {
  return <h1>🍿 Xem Gì Hôm Nay 🎥</h1>;
}

function Form({ onAddMovie }) {
  const [movieTitle, setMovieTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!movieTitle) {
      alert("You must type in something first");
      return;
    }

    const newMovie = { movieTitle, watched: false };
    onAddMovie(newMovie);
    setMovieTitle("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Bạn muốn dự định xem phim nào?</h3>
      <input
        type="text"
        placeholder="Nhập tên phim..."
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>Thêm</button>
    </form>
  );
}

function MovieList({ movies, onDeleteMovie, onToggleMovie, onClearList, onSort }) {

  return (
    <div className="list">
      <ul>
        {movies.map((movie) => (
          <Movie
            movie={movie}
            key={movie.movieTitle}
            onDeleteMovie={onDeleteMovie}
            onToggleMovie={onToggleMovie}
          />
        ))}
      </ul>
      <span>
        <button onClick={onSort} >Sắp xếp danh sách theo tên phim</button>
        {" "}
        <button onClick={onClearList}>Xoá danh sách phim</button>
      </span>
    </div>
  );
}

function Movie({ movie, onDeleteMovie, onToggleMovie }) {
  return (
    <div>
      <input
        type="checkbox"
        value={movie.watched}
        onChange={() => onToggleMovie(movie.movieTitle)}
      />
      <span style={movie.watched ? { textDecoration: "line-through" } : {}}>
        {" "}
        {movie.movieTitle}{" "}
      </span>
      <button onClick={() => onDeleteMovie(movie.movieTitle)}>✖</button>
    </div>
  );
}

function Stats({ movies }) {
  const moviesNum = movies.length;
  const movieWatched = movies.filter((movie) => movie.watched).length;

  return (
    <footer className="stats">
      <em>
        {moviesNum > 0
          ? `Bạn có ${moviesNum} bộ phim trong danh sách, và bạn đã xem được ${movieWatched} phim.`
          : "Danh sách phim đang trống"}
      </em>
    </footer>
  );
}
