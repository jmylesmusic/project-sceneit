import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from '@mantine/core';
import MovieCard from "../components/MovieCard"; // Ensure the path is correct based on your project structure
import styles from '../styles/SearchResults.module.css';


function SearchResults() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_PRIVATE_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setResults(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (!results.length) return <p>No results found for "{query}".</p>;

  return (
    <div>
      <h1>Results for "{query}":</h1>
      <Grid grow gutter="xl" style={{ padding: 20 }}>
        {results.map((movie) => (
          <Grid.Col key={movie.id} span={1}>
            <MovieCard movie={movie} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default SearchResults;