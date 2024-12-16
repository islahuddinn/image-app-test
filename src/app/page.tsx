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

export default function Home() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [commentText, setCommentText] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const response = await axios.get<Photo[]>("/api/photos");
    setPhotos(response.data);
  };

  async function handleUploadPhoto() {
  if (!photoFile) {
    console.error("No file selected");
    return;
  }

  try {
    const imageUrl = await uploadFileToSupabase(photoFile);
    console.log("Uploaded image to Supabase:", imageUrl);
        await axios.post("/api/photos", { url: imageUrl });
        setPhotoFile(null);
        fetchPhotos();
     } catch (error) {
    console.error("Error uploading file:", error);
    }
  };

  const handleSubmitComment = async (photoId: number) => {
    if (commentText) {
      await axios.post("/api/comments", { photoId, text: commentText });
      setCommentText("");
      fetchPhotos();
    }
  };

  const handleReset = async () => {
    await axios.post("/api/reset");
    setPhotos([]);
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
