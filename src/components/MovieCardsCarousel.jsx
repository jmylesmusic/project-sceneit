import { Carousel } from "@mantine/carousel";
import MovieCard from "../components/MovieCard";

console.log(Carousel);
function MovieCardsCarousel() {
  console.log(Carousel);
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      loop
      align="start"
    >
      <Carousel.Slide>
        <MovieCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MovieCard />
      </Carousel.Slide>
      <Carousel.Slide>Slide 3</Carousel.Slide>
      {/* Additional slides */}
    </Carousel>
  );
}

export default MovieCardsCarousel;
