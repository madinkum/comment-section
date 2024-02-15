// Comments.tsx
// Comments.tsx
import React, { useState } from 'react';
import Comment from './Comment';

interface CommentData {
  id: number;
  username: string;
  text: string;
  replies?: string[]; // Updated type to include optional replies
}

interface CommentsProps {
  initialComments: CommentData[];
}

const Comments: React.FC<CommentsProps> = ({ initialComments }) => {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '' && newUsername.trim() !== '') {
      const newId = comments.length + 1;
      const newCommentObj: CommentData = {
        id: newId,
        username: newUsername,
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setNewUsername('');
    }
  };

  const handleDeleteComment = (id: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleEditComment = (id: number, newText: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
  };

  const handleReplyComment = (id: number, replyText: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id
        ? { ...comment, replies: [...(comment.replies || []), replyText] }
        : comment
    );
    setComments(updatedComments);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            username={comment.username}
            text={comment.text}
            replies={comment.replies} // Pass replies to Comment component
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
            onReply={handleReplyComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
