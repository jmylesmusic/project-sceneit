import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext"; // Import useAuth from AuthContext
import SignIn from "../components/SignIn";
import { Carousel } from "@mantine/carousel";
import MovieCard from "../components/MovieCard";
import MovieCardsCarousel from "../components/MovieCardsCarousel";

const User = () => {
  const url = "https://api.themoviedb.org/3/movie";
  const { id } = useParams();
  const { user } = useAuth(); // Access user from AuthContext
  const navigate = useNavigate(); // Used to redirect
  const BACKEND_URL = import.meta.env.VITE_URL_IRONSACK;
  const [userinfo, setUserinfo] = useState(null); // Initialize userinfo to null

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login if no user is logged in
      return;
    }

    if (user.id.toString() !== id) {
      navigate("/"); // Redirect to home if id in the URL does not match the logged-in user's ID
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users?id=${id}`);
        const data = await response.json();
        if (data.length > 0) {
          setUserinfo(data[0]); // Assuming the data returned is an array of users
        } else {
          console.log("No user data found");
          navigate("/"); // Redirect if no valid user data is found
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [id, user, navigate, BACKEND_URL, userinfo]);

  if (!userinfo) {
    return <p>Loading...</p>; // Handling the loading state
  }

  const userMovieDataConvert = (movie) => {
    return {
      id: movie.movieId,

      poster_path: "", // example placeholder, use actual property if available
      title: `Title for ${movie.movieId}`, // example placeholder
      release_date: "2021-01-01", // example placeholder
      vote_average: 7.8, // example placeholder
    };
  };
  return (
    <div>
      <h2>First Name: {userinfo.firstName}</h2>
      <h1>Favorite Movies:</h1>
      <div>
        <Carousel
          withIndicators
          height={300}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
        >
          {userinfo.movies
            ?.filter((movie) => movie.isFavorite)
            .map((movie) => (
              <Carousel.Slide key={movie.movieId}>
                <MovieCard movie={userMovieDataConvert(movie)} />
              </Carousel.Slide>
            )) || <p>None</p>}
        </Carousel>
      </div>
      {/* <MovieCardsCarousel listtype={`${url}/now_playing`} /> */}
      <h1>Watched Movies:</h1>
      <div>
        <Carousel
          withIndicators
          height={300}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
        >
          {userinfo.movies
            ?.filter((movie) => movie.isWatched)
            .map((movie) => (
              <Carousel.Slide key={movie.movieId}>
                <MovieCard movie={userMovieDataConvert(movie)} />
              </Carousel.Slide>
            )) || <p>None</p>}
        </Carousel>
      </div>
      <h1>Movies to Watch:</h1>
      <div>
        <Carousel
          withIndicators
          height={300}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
        >
          {userinfo.movies
            ?.filter((movie) => movie.toWatch)
            .map((movie) => (
              <Carousel.Slide key={movie.movieId}>
                <MovieCard movie={userMovieDataConvert(movie)} />
              </Carousel.Slide>
            )) || <p>None</p>}
        </Carousel>
      </div>
    </div>
  );
};

export default User;
