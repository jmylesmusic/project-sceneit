import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Navbar,
  Footer,
  PageNotFound,
  MovieDetailsPage,
} from "./pages";
import classes from "./styles/App.module.css"; // Import the CSS module here

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
          <Route path="/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
