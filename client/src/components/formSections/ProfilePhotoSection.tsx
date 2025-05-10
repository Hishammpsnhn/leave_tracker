// File: src/components/employee/form-sections/ProfilePhotoSection.tsx
import React from 'react';
import { Box, Button, Avatar } from '@mui/material';
import { PersonOutline, PhotoCamera } from "@mui/icons-material";
import axios from 'axios';

interface ProfilePhotoSectionProps {
  previewUrl: string | null;
  onProfileChange: (profileUrl: string | null) => void;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  previewUrl,
  onProfileChange
}) => {
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file) {
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onProfileChange(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "leave-tracker");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dhs8o9scz/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
          }
        );

        onProfileChange(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };
  
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
      {previewUrl ? (
        <Avatar
          src={previewUrl}
          alt="Profile Preview"
          sx={{ width: 60, height: 60 }}
        />
      ) : (
        <Avatar sx={{ width: 60, height: 60, bgcolor: "#e0e0e0" }}>
          <PersonOutline />
        </Avatar>
      )}

      <Button
        variant="outlined"
        component="label"
        startIcon={<PhotoCamera />}
        size="medium"
      >
        Upload Photo
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
        />
      </Button>
    </Box>
  );
};

export default ProfilePhotoSection;