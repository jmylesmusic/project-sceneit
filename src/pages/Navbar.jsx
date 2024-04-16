import React, { useState } from "react";
import { Autocomplete, Group, Burger, rem, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/HeaderSearch.module.css";
import { useAuth } from "../components/AuthContext";
import SignIn from "../components/SignIn";
import { useForm } from "@mantine/form";
import SearchBar from "../components/SearchBar";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);
  const [signInOpened, setSignInOpened] = useState(false);

  const randomMovieId = Math.floor(Math.random() * 1012272) + 1;

  const API_KEY = import.meta.env.VITE_PRIVATE_API_KEY; // Make sure to define your API key in the .env file

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const handleSearchSubmit = async (values) => {
    const query = values.search;
    console.log("Searching : ", query);
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

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
      setSearchResults(data.results); // Assuming the API response has a results array
      console.log("Search Results", data.results);
    } catch (err) {
      console.error("error:" + err);
    }
  };

  const UserActionButton = () => {
    if (user) {
      return (
        <button type="button" onClick={logout}>
          Logout
        </button>
      );
    } else {
      return (
        <button type="button" onClick={() => setSignInOpened(true)}>
          Login
        </button>
      );
    }
  };

  const links = [
    { link: "/", label: "Movies" },
    { link: "/about", label: "About" },
    { link: `/movies/${randomMovieId}`, label: "Random Movie!" },
  ];

  // Add the "User" link if a user is signed in
  if (user) {
    links.push({ link: `/users/${user.userId}`, label: "User" });
  }

  const items = links.map((link) => (
    <Link key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

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

          <SearchBar />

          <Group className={classes.links} visibleFrom="sm">
            {items}
            <UserActionButton />
          </Group>
        </div>
      </header>

      {/* Drawer for mobile navigation */}
      <Drawer
        opened={opened}
        onClose={toggle}
        title={
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
            <MantineLogo size={28} />
          </Group>
        }
        padding="md"
        size="xs"
        radius="md"
        position="top"
        overlayProps={{ opacity: 0.9, blur: 10, center: true }}
        offset={10}
        withCloseButton={false}
      >
        <div className={classes.drawerLinks}>
          {items}
          <UserActionButton />
        </div>
      </Drawer>

      <SignIn opened={signInOpened} setOpened={setSignInOpened} />
    </>
  );
}

export default Navbar;
