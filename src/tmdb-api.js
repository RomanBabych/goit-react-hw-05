import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjQ4ZTFhYmYwYzZhZmFjMWZhYThhMzRhYzllYjQzYiIsIm5iZiI6MTcyMDcxODMyOC43MjgwOTIsInN1YiI6IjY0MGEyMzYxMzJjYzJiMDBhMjBhYjk4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.igbUv7SKRjlq66EQyj3jS7Hk75KwbVvQoFX6VWJSJDk";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day`;
  const response = await axios.get(url, options);
  return response.data;
};

export const fetchMoviesByQuery = async (query) => {
  const url = `${BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;
  const response = await axios.get(url, options);
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, options);
  console.log(response.data);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(url, options);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data;
};
