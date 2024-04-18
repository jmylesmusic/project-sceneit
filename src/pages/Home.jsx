// import { Autocomplete } from "@mantine/core";
import MovieCardsCarousel from "../components/MovieCardsCarousel";
import "../styles/home.css";
import Header from "../components/Header";

const Home = () => {
  const url = "https://api.themoviedb.org/3/movie";

  return (
    <div>
      <Header />
      <div className="movies-container">
        {/* <MovieCardsCarousel listtype={`${url}/favorite`} /> */}
        <MovieCardsCarousel listtype={`${url}/now_playing`} />
        <MovieCardsCarousel listtype={`${url}/top_rated`} />
        <MovieCardsCarousel listtype={`${url}/popular`} />
        <MovieCardsCarousel listtype={`${url}/upcoming`} />
      </div>
    </div>
  );
};

export default Home;
