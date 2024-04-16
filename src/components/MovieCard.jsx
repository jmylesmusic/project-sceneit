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

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        maxWidth: 540,
        minHeight: "100%", // Ensures that all cards have at least a certain height
        minWidth: "350px",
        margin: "auto",
      }}
    >
      <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
        <Group position="apart">
          <Card.Section style={{ maxWidth: "35%" }}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || ""}`}
              alt={movie.title}
              fit="cover"
              padding="10px"
              style={{ height: "200px" }} // Fixed height for images
              onError={(e) => {
                e.currentTarget.src = placeholder;
              }}
            />
          </Card.Section>
          <Group direction="column" style={{ maxWidth: "65%" }}>
            <Text
              weight={700}
              size="lg"
              style={{
                marginTop: theme.spacing.sm,
                height: "3rem", // Fixed height for the title
                overflow: "hidden", // Prevents content from escaping the fixed height
              }}
            >
              {movie.title}
            </Text>
            <Badge color="pink" variant="light">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </Badge>
            <Group>
              {/* Example: You might want to map genres here if they are included in the movie data */}
            </Group>
            <Text weight={500} style={{ height: "1.5rem" }}>
              {" "}
              {/* Fixed height for the user score */}
              User Score:{" "}
              {Number.isFinite(movie.vote_average)
                ? Math.round(movie.vote_average * 10) + "%"
                : "N/A"}
            </Text>
            {/* Additional buttons or information can go here */}
          </Group>
        </Group>
      </Link>
      <UserButtons movieId={movie.id} />
    </Card>
  );
};

export default MovieCard;
