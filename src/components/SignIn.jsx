// THIS IS THE ONE WE NEED TO USE https://ui.mantine.dev/component/authentication-form/

import { useState } from "react";
import SignUp from "./SignUp";
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
import { useAuth } from "./AuthContext";

function SignIn({ opened, setOpened }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(email, password);
    handleCloseModal(); // Close modal on successful login
  };

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

  // const UserActionButton = () => {
  //   if (user) {
  //     return (
  //       <button type="button" onClick={logout}>
  //         Logout
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button type="button" onClick={() => setSignInOpened(true)}>
  //         Login
  //       </button>
  //     );
  //   }
  // };

  const handleCloseModal = () => {
    setOpened("");
  };

  return (
    <>
      <Modal opened={opened} onClose={handleCloseModal} centered>
        {opened === "signup" ? (
          <SignUp setOpened={setOpened} />
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
              <Button type="submit">Log In</Button>
            </Group>
          </form>
        )}
        <Button
          onClick={() => setOpened(opened === "signup" ? "login" : "signup")}
        >
          {opened === "signup"
            ? "Already have an account? Login here!"
            : "Create a new account"}
        </Button>
      </Modal>

      {/* <SignUp opened={signUpOpened} setOpened={setSignUpOpened} /> */}
    </>
  );
}

function TooltipFocus() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const valid = value.trim().length >= 6;
  return (
    <Tooltip
      label={
        valid ? "All good!" : "Password must include at least 6 characters"
      }
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? "teal" : undefined}
      withinPortal
    >
      <PasswordInput
        label="Tooltip shown onFocus"
        required
        placeholder="Your password"
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Tooltip>
  );
}

export function InputTooltip() {
  return (
    <>
      <TooltipIcon />
      <TooltipFocus />
    </>
  );
}

export default SignIn;
