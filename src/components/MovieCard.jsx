import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const theme = useMantineTheme();

  const { movie } = props;

  return (
    <>
      <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
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
              <Text
                weight={700}
                size="lg"
                style={{ marginTop: theme.spacing.sm }}
              >
                {movie.title}
              </Text>
              <Badge color="pink" variant="light">
                {new Date(movie.release_date).getFullYear()}
              </Badge>
              <Group>
                {/* {movie.genres.map((genre) => (
              <Badge key={genre.id} color="green" variant="light">
                {genre.name}
              </Badge>
            ))} */}
              </Group>
              <Text weight={500}>
                User Score: {Math.round(movie.vote_average * 10)}%
              </Text>

              {/* Here somewhere we should add the Fav, IsWatched .. blah blah */}
            </Group>
          </Group>
        </Card>
      </Link>
    </>
  );
};

export default MovieCard;
