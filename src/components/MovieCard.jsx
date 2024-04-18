import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import placeholder from "../images/noimage.png";
import UserButtons from "./UserButtons";

const MovieCard = (props) => {
  const theme = useMantineTheme();
  const { movie } = props;

  // console.log(movie);
  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        maxWidth: 540,
        minHeight: "300px", // Ensures that all cards have at least a certain height
        minWidth: "350px",
        margin: "auto",
        backgroundColor: "whitesmoke",
        paddingTop: "3rem",
      }}
    >
      <Group position="apart" justify="flex-start">
        <Card.Section style={{ maxWidth: "35%" }}>
          <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || ""}`}
              alt={movie.title}
              fit="cover"
              padding="10px"
              style={{
                height: "200px",
                marginLeft: theme.spacing.sm,
                marginTop: theme.spacing.md,
              }} // Fixed height for images
              onError={(e) => {
                e.currentTarget.src = placeholder;
              }}
            />
          </Link>
        </Card.Section>
        <Group
          direction="column"
          style={{ maxWidth: "60%", marginLeft: "1rem" }}
          justify="flex-end"
          gap="xs"
        >
          <Text
            truncate="end"
            fw="bold"
            c="black"
            weight={800}
            size="lg"
            style={{
              // marginTop: theme.spacing.sm,
              textAlign: "right",
              marginLeft: theme.spacing.md,
              width: "100%",
              height: "2rem", // Fixed height for the title
            }}
          >
            <Link
              to={`/movies/${movie.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {movie.title}
            </Link>
          </Text>
          <Badge color="pink" variant="light">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </Badge>
          <Group>
            {/* Example: You might want to map genres here if they are included in the movie data */}
          </Group>
          <Text
            c="black"
            weight={500}
            style={{ height: "2rem", width: "100%", textAlign: "right" }}
          >
            {" "}
            {/* Fixed height for the user score */}
            User Score:{" "}
            {Number.isFinite(movie.vote_average)
              ? Math.round(movie.vote_average * 10) + "%"
              : "N/A"}
          </Text>
          {/* Additional buttons or information can go here */}
          <UserButtons movieData={movie} />
        </Group>
      </Group>
    </Card>
  );
};

export default MovieCard;
