import { useState, useEffect } from "react";
import MovieCardsCarousel from "../components/MovieCardsCarousel";
import "../styles/movies.css";

const Movies = () => {
  const [genresData, setGenresData] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const API_KEY = import.meta.env.VITE_PRIVATE_API_KEY;

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${API_KEY}`);

        const requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };

        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          requestOptions
        );

        if (response.ok) {
          const data = await response.json();
          setGenresData(data.genres);
        } else {
          throw new Error("Failed to fetch genre data");
        }
      } catch (error) {
        console.error("Error fetching genre data:", error);
      }
    };

    fetchGenres();
  }, []);

  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=";

  return (
    <div className="movies-screen-container">
      {genresData.map((genre) => (
        <div key={genre.id}>
          <h1 className="Title">{genre.name}</h1>
          <MovieCardsCarousel listtype={`${url}${genre.id}`} />
        </div>
      ))}
    </div>
  );
};

export default Movies;
