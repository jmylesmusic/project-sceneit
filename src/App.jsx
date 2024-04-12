import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Navbar,
  Footer,
  PageNotFound,
  MovieDetailsPage,
} from "./pages";

function App() {
  return (
    <div>
      {/* Use styling inside DIV */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/:movieId" element={<MovieDetailsPage />} />
        {/*  other Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
