import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../tmdb-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then((data) => setCast(data.cast));
  }, [movieId]);

  const defaultImg =
    "https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+Image";

  return (
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li className={css.castListItem} key={actor.id}>
          <img
            className={css.castImage}
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : defaultImg
            }
            alt={actor.name}
          />
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
}
