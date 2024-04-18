import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "../styles/HeroImageBackground.module.css";
import SignIn from "./SignIn";
import { useAuth } from "../components/AuthContext";

import { useState } from "react";

export function Header() {
  const [signInOpened, setSignInOpened] = useState(false);
  const [authModal, setAuthModal] = useState("");
  const { user } = useAuth();

  const HelloUser = () => {
    return <h1 style={{ color: "white" }}>Welcome, {user.firstName}!</h1>;
  };

  const HeaderButtons = () => {
    if (!user) {
      return (
        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="white"
            size="lg"
            type="button"
            onClick={() => setAuthModal("login")}
          >
            Sign In
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
            type="button"
            onClick={() => setAuthModal("signup")}
          >
            Sign Up
          </Button>
          <SignIn opened={authModal} setOpened={setAuthModal} />
        </div>
      );
    }
  };

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        {user ? (
          <Title className={classes.title}>
            <HelloUser />
          </Title>
        ) : (
          <Title className={classes.title}>
            Connecting you with your new favorite movie!
          </Title>
        )}

        {!user && (
          <Container size={640}>
            <Text color="white" size="lg" className={classes.description}>
              Movies bring the world together. Find the most popular, most
              buzz-worthy movies that you are certain to love. Search by genre
              to find a new favorite!
            </Text>
          </Container>
        )}
        <HeaderButtons />
      </div>
    </div>
  );
}

export default Header;
