import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/HeaderSearch.module.css";
function Navbar() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);

  const handleRandomMovieClick = () => {
    const randomMovieId = Math.floor(Math.random() * 1012272) + 1;
    navigate(`/${randomMovieId}`);
  };
  const links = [
    { link: "/", label: "Movies" },
    { link: "/", label: "Pricing" },
    { link: "/about", label: "About" },
  ];

  // Combine standard links with the dynamic "Random Movie!" link
  const items = [
    ...links.map((link) => (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    )),
    <a
      key="Random Movie!"
      onClick={handleRandomMovieClick}
      className={classes.link}
      style={{ cursor: "pointer" }}
    >
      Random Movie!
    </a>,
  ];

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <MantineLogo size={28} />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
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
        </Group>
      </div>
    </header>
  );
}

export default Navbar;
