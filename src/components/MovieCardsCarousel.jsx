import { Carousel } from "@mantine/carousel";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";

function MovieCardsCarousel(props) {
  const { listtype } = props;
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const theme = useMantineTheme();
  const API_KEY = import.meta.env.VITE_PRIVATE_API_KEY;

  useEffect(() => {
    async function fetchData() {
      const url = `${listtype}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`, // Replace YOUR_ACCESS_TOKEN with your actual API token
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setList(data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!list) return <div>No movie data found</div>;

  return (
    <>
      <div>{listtype}</div>
      <Carousel
        withIndicators
        height={200}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
      >
        {list.results.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <MovieCard movie={movie} />
          </Carousel.Slide>
        ))}
        ;
      </Carousel>
    </>
  );
}

export default MovieCardsCarousel;
