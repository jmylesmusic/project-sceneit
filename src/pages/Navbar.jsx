import React, { useState } from "react";
import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/HeaderSearch.module.css";
import { useAuth } from "../components/AuthContext";
import SignIn from "../components/SignIn";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);
  const [signInOpened, setSignInOpened] = useState(false);

  const randomMovieId = Math.floor(Math.random() * 1012272) + 1;
  const handleRandomMovieClick = () => {
    navigate(`/movies/${randomMovieId}`);
  };

  const links = [
    { link: "/", label: "Movies" },
    // { link: `/users/${user.userId}`, label: "User" },
    { link: "/about", label: "About" },
    { link: `/movies/${randomMovieId}`, label: "Random Movie!" },
  ];

  // Combine standard links with the dynamic "Random Movie!" link
  const items = [
    ...links.map((link) => (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    )),
  ];

  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
            <MantineLogo size={28} />
          </Group>

          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />

          <Group>
            <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
              {items}
              {user ? (
                <button type="button" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button type="button" onClick={() => setSignInOpened(true)}>
                  Login
                </button>
              )}
            </Group>
          </Group>
        </div>
      </header>
      <SignIn opened={signInOpened} setOpened={setSignInOpened} />
    </>
  );
}

export default Navbar;
