import React, { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const handleSearchSubmit = async (values) => {
    const query = values.search.trim();
    if (!query) return;  // Check if the query is not empty

    console.log("Searching:", query);  // Debugging output to console

    // Navigate to the search results page, passing the query as a URL parameter
    navigate(`/search-results?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={form.onSubmit(handleSearchSubmit)}>
      <Group>
        <TextInput
          required
          placeholder="Search for a movie title..."
          {...form.getInputProps('search')}
          style={{ flex: 1 }}
        />
        <Button type="submit">Search</Button>
      </Group>
    </form>
  );
}

export default SearchBar;
