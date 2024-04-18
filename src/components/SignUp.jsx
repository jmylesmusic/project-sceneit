import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Tooltip,
  Center,
  Text,
  Button,
  Modal,
  Group,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

function SignUp({ setSignUpOpened }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const BACKEND_URL = import.meta.env.VITE_URL_IRONSACK;
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle
            // style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </Center>
      </Text>
    </Tooltip>
  );

  async function submitHandler(event) {
    event.preventDefault();

    const getUser = await fetch(`${BACKEND_URL}/users?email=${email}`);

    if (!getUser.ok) {
      throw new Error("Network response was not ok while checking users");
    }
    const usersData = await getUser.json();
    if (usersData.length > 0) {
      alert(` User already exists `, email);
      return;
    }

    try {
      const body = {
        email,
        password,
        firstName,
        secondName,
      };

      console.log(body);
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(`User ${email} created successfully!`);
        setSignUpOpened(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Create a New Account</h1>
      <form onSubmit={submitHandler}>
        {" "}
        <TextInput
          label="First Name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          rightSection={rightSection}
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          rightSection={rightSection}
          required
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rightSection={rightSection}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
        />
        <Group position="right" mt="md">
          <Button type="submit">Create Account</Button>
        </Group>
      </form>
    </div>
  );
}

export default SignUp;
