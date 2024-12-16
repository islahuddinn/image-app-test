"use client";

import React from "react";
import styles from "../styles/home.module.css";

interface Props {
  photoId: number;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  onSubmitComment: (photoId: number) => void;
}

const CommentSection: React.FC<Props> = ({
  photoId,
  commentText,
  setCommentText,
  onSubmitComment,
}) => {
  return (
    <div className={styles.comment_input}>
      <input
        type="text"
        placeholder="Enter comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={() => onSubmitComment(photoId)}>Submit</button>
    </div>
  );
};

export default CommentSection;
