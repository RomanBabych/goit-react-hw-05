import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, Link, Routes, Route, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../tmdb-api";
import { FaArrowLeft } from "react-icons/fa";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchMovieDetails(movieId).then((data) => setMovie(data));
  }, [movieId]);

  if (!movie) return null;

  const votePercent = Math.floor(movie.vote_average * 10);

  return (
    <div className={css.container}>
      <button className={css.backBtn}>
        <FaArrowLeft size={10} />
        <Link className={css.backLink} to={location.state?.from ?? "/movies"}>
          Go back
        </Link>
      </button>
      <div className={css.contentWrapper}>
        <div className={css.imageWrapper}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={css.detailsWrapper}>
          <h1>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <p>User Score: {votePercent}%</p>
          <h2>Oveview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>

      <div className={css.optionsWrapper}>
        <p className={css.optionsText}>Additional information</p>
        <ul className={css.optionsList}>
          <li>
            <Link
              className={css.optionsLink}
              to={`cast`}
              state={{ from: location.state?.from }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              className={css.optionsLink}
              to={`reviews`}
              state={{ from: location.state?.from }}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}
