import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Navbar,
  Footer,
  PageNotFound,
  MovieDetailsPage,
  User,
  SearchResults,
} from "./pages";
import classes from "./styles/App.module.css"; // Import the CSS module here
import Movies from "./pages/Movies";

function App() {
  return (
    <div className={classes.appContainer}>
      <Navbar />
      <div className={classes.mainContent}>
        {" "}
        {/* Add this wrapper */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
