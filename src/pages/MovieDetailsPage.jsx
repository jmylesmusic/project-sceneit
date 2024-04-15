import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Title,
  Button,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import placeholder from "../images/noimage.png";

function MovieDetailsPage() {
  const { movieId } = useParams(); // Extract `movieId` from the URL
  // PLACEHOLDER
  // let movieId = 422;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useMantineTheme();
  const API_KEY = import.meta.env.VITE_PRIVATE_API_KEY;

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      console.log("Fetch URL:", url); // Ensure URL is correctly formed
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        const data = await response.json();
        setMovie(data);
        console.log("Movie Data:", data); // Log the movie data
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load movie data: " + error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  if (loading) return <Loader />; // Using Mantine's Loader for better UI
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie data found</div>;

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 450, margin: "auto" }}
    >
      <Card.Section>
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : placeholder
          }
          alt={movie.title}
          width={300}
          height="auto"
          fit="cover"
          placeholder={
            <Image
              src={placeholder}
              alt="No image available"
              fit="contain"
              width={300}
              height="auto"
            />
          }
          onError={(event) => (event.currentTarget.src = placeholder)}
        />
      </Card.Section>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Title order={2}>{movie.title}</Title>
        <Badge color="pink" variant="light">
          {new Date(movie.release_date).getFullYear()}
        </Badge>
      </Group>
      <Text size="sm" style={{ color: theme.colors.gray[6], lineHeight: 1.5 }}>
        {movie.tagline}
      </Text>
      <Text size="sm" style={{ marginTop: theme.spacing.md }}>
        {movie.overview}
      </Text>
      <Group position="left" style={{ margin: "10px 0" }}>
        {movie.genres.map((genre) => (
          <Badge key={genre.id} color="green" variant="light">
            {genre.name}
          </Badge>
        ))}
      </Group>
      <Group
        position="apart"
        style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.xs }}
      >
        <Button variant="light" color="blue" radius="xl">
          Watch Trailer
        </Button>
        <Text weight={500}>
          User Score: {Math.round(movie.vote_average * 10)}%
        </Text>
      </Group>
    </Card>
  );
}

export default MovieDetailsPage;
