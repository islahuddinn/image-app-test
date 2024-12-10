"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type Comment = {
  id: number;
  text: string;
};

type Photo = {
  id: number;
  url: string;
  comments: Comment[];
};

export default function Home() {
  const [photoURL, setPhotoURL] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const response = await axios.get<Photo[]>("/api/photos");
    setPhotos(response.data);
  };

  const handleUploadPhoto = async () => {
    if (photoURL) {
      await axios.post("/api/photos", { url: photoURL });
      setPhotoURL("");
      fetchPhotos();
    }
  };

  const handleSubmitComment = async (photoId: number) => {
    if (commentText) {
      await axios.post("/api/comments", {
        photoId,
        text: commentText,
      });
      setCommentText("");
      fetchPhotos();
    }
  };

  const handleReset = async () => {
    await axios.post("/api/reset");
    setPhotos([]);
  };

  return (
    <div className="container">
      <h1>Photo Upload & Comments</h1>
      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <button onClick={handleUploadPhoto}>Upload Photo</button>
      </div>

      <div className="photo-list">
        <h2>Uploaded Photos & Comments</h2>
        {photos.length === 0 && <p>No photos uploaded yet.</p>}
        {isClient && (
          <div className="photo-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-container">
                <div className="photo">
                  <Image
                    src={photo.url}
                    alt="Uploaded photo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <button
                  className="comment-button"
                  onClick={() => setSelectedPhotoId(photo.id)}
                >
                  Add Comment
                </button>

                {selectedPhotoId === photo.id && (
                  <div className="comment-input">
                    <input
                      type="text"
                      placeholder="Enter comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={() => handleSubmitComment(photo.id)}>
                      Submit
                    </button>
                  </div>
                )}

                <div className="comments-section">
                  <h4>Comments:</h4>
                  {photo.comments.length === 0 && <p>No comments yet.</p>}
                  {photo.comments.map((comment) => (
                    <p key={comment.id}>{comment.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="reset-section">
        <button onClick={handleReset}>Reset Database</button>
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .upload-section,
        .reset-section {
          margin: 20px 0;
        }
        .photo-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .photo-container {
          margin: 20px 0;
          text-align: center;
          width: 300px;
        }
        .photo {
          width: 100%;
          height: 200px;
          position: relative;
        }
        .comment-button {
          margin-top: 10px;
        }
        .comment-input {
          margin-top: 10px;
        }
        .comments-section {
          font-size: 14px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
