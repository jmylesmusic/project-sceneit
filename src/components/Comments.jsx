import React, { useState, useEffect } from "react";
import { Text, Avatar, Group, TextInput, Button, Stack } from "@mantine/core";
import { useAuth } from "../components/AuthContext"; // Import useAuth from AuthContext
import SignIn from "../components/SignIn"; // Import the SignIn component
import Message from "./Message";

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

  const deleteComment = async (commentId) => {
    if (!user) {
      setSignInOpened(true);
      return;
    }
  
    const response = await fetch(`${BACKEND_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Include an authorization header if your API requires authentication
        // 'Authorization': `Bearer ${user.token}`, 
      },
      body: JSON.stringify({
        userId: user.id, // Send the user ID if needed for authorization checks
      }),
    });
  
    if (response.ok) {
      // Remove the comment from the state to update the UI
      setComments(comments.filter((comment) => comment.id !== commentId));
    } else {
      // Optionally, handle errors here
      console.error('Failed to delete the comment');
    }
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
    <>
      <SignIn opened={signInOpened} setOpened={setSignInOpened} />
      {comments?.map((comment) => (
        <Message
          key={comment.id}
          comment={comment}
          isOwner={user && user.id === comment.userId} // Assuming comment has userId
          onDelete={deleteComment}
        />
      ))}
      <Stack>
        <TextInput
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(event) => event.key === 'Enter' && postComment()}
        />
        <Button type="submit" onClick={postComment}>Post Comment</Button>
      </Stack>
    </>
  );
}

export default Comments;
