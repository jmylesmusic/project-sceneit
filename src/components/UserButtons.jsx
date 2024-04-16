import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { ActionIcon, rem } from "@mantine/core";
import { IconHeart, IconBookmark, IconEye } from "@tabler/icons-react";
import SignIn from "../components/SignIn"; // Import the SignIn component

const UserButtons = ({ movieId }) => {
  const URL = import.meta.env.VITE_URL_IRONSACK;
  const { user, userMovies, updateUserMovies } = useAuth();
  const [state, setState] = useState({
    isFavorite: false,
    isWatched: false,
    toWatch: false,
  });
  const [signInOpened, setSignInOpened] = useState(false); // State to control sign-in modal

  // Initialize button states from userMovies if user is logged in
  useEffect(() => {
    if (user && Array.isArray(userMovies)) {
      const movie = userMovies.find((m) => m.movieId === movieId);
      if (movie) {
        setState({
          isFavorite: movie.isFavorite,
          isWatched: movie.isWatched,
          toWatch: movie.toWatch,
        });
      } else {
        // If movie not found
        setState({ isFavorite: false, isWatched: false, toWatch: false });
      }
    } else {
      // If userMovies is not array or user is not logged in
      setState({ isFavorite: false, isWatched: false, toWatch: false });
    }
  }, [user, userMovies, movieId]);

  const toggleState = async (type) => {
    if (!user) {
      setSignInOpened(true);
      return;
    }

    // Determine the property to toggle based on 'type'

    const updatedMovies = userMovies.map((movie) =>
      movie.movieId === movieId ? { ...movie, [type]: !movie[type] } : movie
    );

    // If the movie isn't found, it means we need to add it to the list
    if (!updatedMovies.find((m) => m.movieId === movieId)) {
      updatedMovies.push({
        movieId: movieId,
        isFavorite: type === "isFavorite" ? true : false,
        isWatched: type === "isWatched" ? true : false,
        toWatch: type === "toWatch" ? true : false,
      });
    }

    // Call the method from context to update the movies array
    updateUserMovies(updatedMovies);
  };

  return (
    <div
      className="buttonCards"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <SignIn opened={signInOpened} setOpened={setSignInOpened} />
      <ActionIcon
        size={42}
        variant={state.isFavorite ? "filled" : "outline"}
        aria-label="Toggle Favorite"
        onClick={() => toggleState("isFavorite")}
      >
        <IconHeart style={{ width: rem(24), height: rem(24) }} />
      </ActionIcon>
      <ActionIcon
        size={42}
        variant={state.isWatched ? "filled" : "outline"}
        aria-label="Toggle Watched"
        onClick={() => toggleState("isWatched")}
      >
        <IconEye style={{ width: rem(24), height: rem(24) }} />
      </ActionIcon>
      <ActionIcon
        size={42}
        variant={state.toWatch ? "filled" : "outline"}
        aria-label="Toggle To See"
        onClick={() => toggleState("toWatch")}
      >
        <IconBookmark style={{ width: rem(24), height: rem(24) }} />
      </ActionIcon>
    </div>
  );
};

export default UserButtons;
