import React, { useState, useEffect } from 'react';
import { addComment, getComments } from '../../../firebase/comments';
import './styles.css';
import Button from '../../Common/Button';

const Comments = ({ coinId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getComments(coinId);
      setComments(commentsData);
    };
    fetchComments();
  }, [coinId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment(coinId, newComment);
      setNewComment('');
      const updatedComments = await getComments(coinId);
      setComments(updatedComments);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
        ></textarea>
        <div className="comments-input-btn-flex">
          <Button onClick={handleAddComment} text={"Post Comment"} />
        </div>
      </div>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.email}:</strong> {comment.text}
              </p>
              <small>{new Date(comment.timestamp.toDate()).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
