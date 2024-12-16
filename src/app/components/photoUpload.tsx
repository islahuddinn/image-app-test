import React, { Dispatch, SetStateAction } from "react";
import styles from "../styles/home.module.css";

interface PhotoUploadProps {
  onUpload: () => Promise<void>;
  setPhotoFile: Dispatch<SetStateAction<File | null>>;
  isDisabled: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onUpload,
  setPhotoFile,
  isDisabled,
}) => {
  return (
    <div className={styles.upload_section}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setPhotoFile(e.target.files ? e.target.files[0] : null)
        }
      />
      <button onClick={onUpload} disabled={isDisabled}>
        Upload Photo
      </button>
    </div>
  );
};

export default PhotoUpload;