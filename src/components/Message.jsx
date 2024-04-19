import { Text, Avatar, Group, Button, Box, Modal } from '@mantine/core';
import { useState } from 'react';

function Message({ comment, isOwner, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const messageAlignment = isOwner ? 'flex-end' : 'flex-start';
  const bubbleColor = isOwner ? '#d1eaff' : '#f0f0f0';

  const handleDelete = () => {
    onDelete(comment.id);
    setShowConfirm(false); // Hide the modal after confirming
  };
  

  return (
    <>
      <Group position={messageAlignment} spacing="xs" style={{ marginBottom: 10 }}>
        <Box
          style={{
            backgroundColor: bubbleColor,
            padding: '8px 12px',
            borderRadius: '16px',
            maxWidth: '80%',
            margin: isOwner ? '0 0 0 auto' : '0 auto 0 0', // align the message box to the left or right
          }}
        >
          <div style={{ position: 'relative' }}>
            <Text size="sm">{comment.commenterName}</Text>
            {isOwner && (
              <Button
                size="15px"
                style={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => setShowConfirm(true)}
              >
                X
              </Button>
            )}
            <Text size="xs" color="dimmed">
              Posted at {new Date(comment.timestamp).toLocaleTimeString()}
            </Text>
            <Text size="sm">
              {comment.text}
            </Text>
          </div>
        </Box>
      </Group>
      {/* Confirmation Modal */}

        <Modal
        title="Confirm deletion"
        opened={showConfirm}
        onClose={() => setShowConfirm(false)}
      >
        <Text>Are you sure you want to delete this comment?</Text>
        <Button color="red" onClick={handleDelete}>Yes</Button>
        <Button onClick={() => setShowConfirm(false)}>No</Button>
      </Modal>
   
    </>
  );
}

export default Message;
