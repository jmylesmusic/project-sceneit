import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext"; // Import useAuth from AuthContext
import SignIn from "../components/SignIn";

const User = () => {
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
  }, [id, user, navigate, BACKEND_URL]);

  if (!userinfo) {
    return <p>Loading...</p>; // Handling the loading state
  }

  return (
    <div>
      <p>First Name: {userinfo.firstName}</p>
      <p>
        Favorite Movies:{" "}
        {userinfo.movies
          ?.filter((movie) => movie.isFavorite)
          .map((movie) => movie.movieId)
          .join(", ") || "None"}
      </p>
      <p>
        Watched Movies:{" "}
        {userinfo.movies
          ?.filter((movie) => movie.isWatched)
          .map((movie) => movie.movieId)
          .join(", ") || "None"}
      </p>
      <p>
        To Watch Movies:{" "}
        {userinfo.movies
          ?.filter((movie) => movie.toWatch)
          .map((movie) => movie.movieId)
          .join(", ") || "None"}
      </p>
    </div>
  );
};

export default User;
