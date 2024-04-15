import { Link } from "react-router-dom";
import { Container, Image, Anchor, Text } from "@mantine/core";
import classes from "../styles/Footer.module.css"; // Make sure to create this CSS module
import tmdbLogo from "../images/tmdblogo.svg";

function Footer() {
  return (
    <Container
      className={classes.footer}
      fluid
      padding="md"
      style={{ background: "#1A1B1E", color: "white" }}
    >
      <div className={classes.content}>
        <Text align="center" size="sm">
          API provided by
          <Anchor
            href="https://developer.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={tmdbLogo}
              className={classes.logo}
              fit="contain"
              alt="The Movie DB Logo"
            />
          </Anchor>
        </Text>

        {/* Should we have the About us section here ? */}
        <Text align="center" size="sm" style={{ marginTop: 10 }}>
          <Link to="/about" className={classes.link}>
            About Us
          </Link>
        </Text>
      </div>
    </Container>
  );
}

export default Footer;
