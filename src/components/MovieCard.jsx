import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
} from "@mantine/core";

const MovieCard = () => {
  const theme = useMantineTheme();

  const movie = {
    poster_path: "/path/to/movie/poster.jpg", // Path to the movie's poster image
    title: "12 Angry Men",
    release_date: "1957-04-10", // The release date of the movie
    genres: [
      { id: 1, name: "Drama" },
      { id: 2, name: "Crime" },
    ],
    vote_average: 8.9, // The movie's average vote
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 540, margin: "auto" }}
    >
      <Group position="apart">
        <Card.Section style={{ maxWidth: "35%" }}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fit="cover"
          />
        </Card.Section>
        <Group direction="column" style={{ maxWidth: "65%" }}>
          <Badge color="pink" variant="light">
            {new Date(movie.release_date).getFullYear()}
          </Badge>
          <Group>
            {movie.genres.map((genre) => (
              <Badge key={genre.id} color="green" variant="light">
                {genre.name}
              </Badge>
            ))}
          </Group>
          <Text weight={500}>
            User Score: {Math.round(movie.vote_average * 10)}%
          </Text>
        </Group>
      </Group>
      <Text weight={700} size="lg" style={{ marginTop: theme.spacing.sm }}>
        {movie.title}
      </Text>
    </Card>
  );
};

export default MovieCard;
