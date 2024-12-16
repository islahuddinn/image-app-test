"use client";

import React from "react";
import Image from "next/image";
import styles from "../styles/home.module.css";

import CommentSection from "./commentSection";

type Comment = {
  id: number;
  text: string;
};

type Photo = {
  id: number;
  url: string;
  comments: Comment[];
};

interface Props {
  photos: Photo[];
  selectedPhotoId: number | null;
  setSelectedPhotoId: React.Dispatch<React.SetStateAction<number | null>>;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  onSubmitComment: (photoId: number) => void;
}

const PhotoGrid: React.FC<Props> = ({
  photos,
  selectedPhotoId,
  setSelectedPhotoId,
  commentText,
  setCommentText,
  onSubmitComment,
}) => {
  return (
    <div className={styles.photo_grid}>
      {photos.map((photo) => (
        <div key={photo.id} className={styles.photo_container}>
          <div className={styles.photo}>
            <Image
              src={photo.url}
              alt="Uploaded photo"
              width={300}
              height={200}
              style={{ borderRadius: "8px" }}
            />
          </div>
          <button
            className={styles.comment_button}
            onClick={() => setSelectedPhotoId(photo.id)}
          >
            Add Comment
          </button>

          {selectedPhotoId === photo.id && (
            <CommentSection
              photoId={photo.id}
              commentText={commentText}
              setCommentText={setCommentText}
              onSubmitComment={onSubmitComment}
            />
          )}

          <div className={styles.comments_section}>
            <h4>Comments:</h4>
            {photo.comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              photo.comments.map((comment) => (
                <p key={comment.id}>{comment.text}</p>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
