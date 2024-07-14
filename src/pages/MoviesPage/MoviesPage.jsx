import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetchMoviesByQuery(query).then((data) => setMovies(data.results));
      setQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
