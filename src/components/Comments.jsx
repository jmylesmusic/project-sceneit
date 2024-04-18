import React, { useState, useEffect } from "react";
import { Text, Avatar, Group, TextInput, Button, Stack } from "@mantine/core";
import { useAuth } from "../components/AuthContext"; // Import useAuth from AuthContext
import SignIn from "../components/SignIn"; // Import the SignIn component

export function Comments({ movieId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth(); // Use the useAuth hook to access the user state
  const BACKEND_URL = import.meta.env.VITE_URL_IRONSACK; // Assuming the environment variable is set
  const [signInOpened, setSignInOpened] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${BACKEND_URL}/comments?movieId=${movieId}`);
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, [movieId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const postComment = async () => {
    if (!user) {
      setSignInOpened(true);
      return;
    }

    const commenterName = `${user.firstName} ${user.secondName}`; // Concatenate user's first and second name

    const response = await fetch(`${BACKEND_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        movieId: movieId,
        commenterName :  commenterName,
        text: newComment,
        timestamp: new Date().toISOString() // Optional: handle timestamp on the server
      }),
    });

    if (response.ok) {
      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment("");  // Reset the comment input box after successful post
    } else {
      // Optionally, handle errors here, such as displaying a notification NONE :D
    }
  };


  return (
    <div>
      <SignIn opened={signInOpened} setOpened={setSignInOpened} />
      {comments?.map((comment) => (
      <Group key={comment.id}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          alt={comment.commenterName}  // Use the commenterName from the comment itself
          radius="xl"
        />
        <div>
          <Text size="sm">{comment.commenterName}</Text> 
            <Text size="xs" color="dimmed">
            {new Date(comment.timestamp).toLocaleTimeString()} ago
          </Text>
        </div>
        <Text pl={54} pt="sm" size="sm">
          {comment.text}
        </Text>
      </Group>
    ))}
      <Stack>
        <TextInput
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(event) => event.key === 'Enter' && postComment()}
        />
        <Button onClick={postComment}>Post Comment</Button>
      </Stack>
    </div>
  );
}

export default Comments;
