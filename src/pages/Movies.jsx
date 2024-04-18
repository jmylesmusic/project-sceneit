import MovieCardsCarousel from "../components/MovieCardsCarousel";
import "../styles/movies.css";
const Movies = () => {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=";
  return (
    <div className="movies-screen-container">
      {/* <MovieCardsCarousel listtype={`${url}/favorite`} /> */}
      <h1>Drama</h1>
      <MovieCardsCarousel listtype={`${url}18`} />
      <h1>Animation</h1>
      <MovieCardsCarousel listtype={`${url}16`} />
      <h1>Action</h1>
      <MovieCardsCarousel listtype={`${url}28`} />
      <h1>Crime</h1>
      <MovieCardsCarousel listtype={`${url}80`} />
    </div>
  );
};

export default Movies;
