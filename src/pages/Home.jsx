// import { Autocomplete } from "@mantine/core";
import MovieCardsCarousel from "../components/MovieCardsCarousel";
// Search bar function https://mantine.dev/core/autocomplete/
// Movie carosel function https://mantine.dev/x/carousel/
const Home = () => {
  const url = "https://api.themoviedb.org/3/movie";

  return (
    <div>
      <MovieCardsCarousel listtype={`${url}/now_playing`} />
      <MovieCardsCarousel listtype={`${url}/popular`} />
      <MovieCardsCarousel listtype={`${url}/top_rated`} />
      <MovieCardsCarousel listtype={`${url}/upcoming`} />
    </div>
  );
};

export default Home;
