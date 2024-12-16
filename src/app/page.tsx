"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { uploadFileToSupabase } from "../../utils/fileUpload";
import PhotoUpload from "./components/photoUpload";
import PhotoGrid from "./components/photoGrid";
import ResetDatabase from "./components/resetDatabase";
import styles from "./styles/home.module.css";

type Comment = {
  id: number;
  text: string;
};

type Photo = {
  id: number;
  url: string;
  comments: Comment[];
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


export default function Home() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [commentText, setCommentText] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get<Photo[]>(`${BASE_URL}/api/photos`);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  async function handleUploadPhoto() {
    if (!photoFile) {
      console.error("No file selected");
      return;
    }

    try {
      const imageUrl = await uploadFileToSupabase(photoFile);
      console.log("Uploaded image to Supabase:", imageUrl);

      await axios.post(`${BASE_URL}/api/photos`, { url: imageUrl });
      setPhotoFile(null);
      fetchPhotos();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  const handleSubmitComment = async (photoId: number) => {
    if (commentText) {
      try {
        await axios.post(`${BASE_URL}/api/comments`, {
          photoId,
          text: commentText,
        });
        setCommentText("");
        fetchPhotos();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${BASE_URL}/api/reset`);
      setPhotos([]);
    } catch (error) {
      console.error("Error resetting database:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Photo Upload & Comments</h1>
      <PhotoUpload
        onUpload={handleUploadPhoto}
        setPhotoFile={setPhotoFile}
        isDisabled={!photoFile}
      />
      <PhotoGrid
        photos={photos}
        selectedPhotoId={selectedPhotoId}
        setSelectedPhotoId={setSelectedPhotoId}
        commentText={commentText}
        setCommentText={setCommentText}
        onSubmitComment={handleSubmitComment}
      />
      <ResetDatabase onReset={handleReset} />
    </div>
  );
}
