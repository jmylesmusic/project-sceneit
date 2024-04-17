import React, { useState } from "react";
import {
  Autocomplete,
  Group,
  Burger,
  rem,
  Drawer,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/HeaderSearch.module.css";
import { useAuth } from "../components/AuthContext";
import SignIn from "../components/SignIn";
import { useForm } from "@mantine/form";
import SearchBar from "../components/SearchBar";
import websiteLogo from "../images/logo-no-background.svg";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);
  const [signInOpened, setSignInOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const randomMovieId = Math.floor(Math.random() * 1012272) + 1;

  const useButtonNavigate = () => {
    navigate("/");
  };
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
        <Button type="button" onClick={logout}>
          Logout
        </Button>
      );
    } else {
      return (
        <Button type="button" onClick={() => setSignInOpened(true)}>
          Login
        </Button>
      );
    }
  };

  const links = [
    { link: "/movies", label: "Movies" },
    user && { link: `/users/${user.id}`, label: "User" }, // Render "User" link only if user is signed in
    { link: "/about", label: "About" },
    {
      link: `/movies/${randomMovieId}`,
      label: "Random Movie!",
    },
  ].filter(Boolean);

  // Combine standard links with the dynamic "Random Movie!" link
  const items = [
    ...links.map((link) => (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    )),
  ];

  const searchItems = [];

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
            <img
              src={websiteLogo}
              height={"35px"}
              onClick={useButtonNavigate}
              className={classes.logoImage}
            />
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
            {/*             <img
              className={classes.logoImage}
              src={websiteLogo}
              height={"40px"}
              onClick={useButtonNavigate}
            /> */}
          </Group>
        }
        padding="md"
        size="xs"
        radius="md"
        position="left"
        overlayProps={{ opacity: 0.9, blur: 10, center: true }}
        offset={0}
        withCloseButton={false}
        // Do we want  to be max width ?

        // styles={{
        //   content: {
        //     width: 'auto',
        //     maxWidth: '50%', // Ensure the Drawer does not exceed the screen width
        //   },
        // }}
      >
        <div className={classes.drawerLinks} onClick={toggle}>
          {items}
          <UserActionButton />
        </div>
      </Drawer>

      <SignIn opened={signInOpened} setOpened={setSignInOpened} />
    </>
  );
}

export default Navbar;
