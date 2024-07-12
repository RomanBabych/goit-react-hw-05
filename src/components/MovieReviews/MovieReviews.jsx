import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../tmdb-api.js";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>We dont have any reviews for this movie.</p>
      ) : (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p className={css.author}>AUTHOR: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
