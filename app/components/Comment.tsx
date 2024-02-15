// Comment.tsx
import React, { useState } from 'react';

interface CommentProps {
  id: number;
  username: string;
  text: string;
  replies?: string[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onReply: (id: number, replyText: string) => void;
}

const Comment: React.FC<CommentProps> = ({ id, username, text, onDelete, onEdit, onReply }) => {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [replyText, setReplyText] = useState('');

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(id, newText);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setNewText(text);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleReply = () => {
    if (replyText.trim() !== '') {
      onReply(id, replyText);
      setReplyText('');
    }
  };

  return (
    <div>
      <p>
        <strong>{username}:</strong> 
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        ) : (
          <span>{text}</span>
        )}
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleReply}>Reply</button>
          </>
        )}
      </p>
      {isEditing ? null : (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Reply</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
