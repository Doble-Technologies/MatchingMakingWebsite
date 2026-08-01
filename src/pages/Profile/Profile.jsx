import React, { useState } from 'react';
import styled from "@emotion/styled";
import { config } from '@src/config';
import {
  readCookie,
  TOKEN_COOKIE_NAME
} from '../../Auth/authUtils';

// Container for the entire profile section
const PageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "24% 50% 24%",
  padding: "10px",
  gap: "1%",

});

// Enhanced button component with hover states and styling
const UploadButton = styled.button`
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: #3b82f6; /* Blue primary color */
  color: white;
  padding: '10px 20px';
  
  &:hover {
    background-color: #2563eb; /* Darker blue on hover */
  }

`;

// Image preview component with better styling and error handling
const ProfileImagePreview = styled.img`
  max-width: "100%"; 
  max-height: "200px"; 
  margin-top: "15px"; 
  border-radius: "8px" 
  
`;

export const Profile = () => {
  // State for image file and preview URL with proper initialization
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(""); 
  const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await fetch(`${config.api_url}/users/avatar/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${readCookie(TOKEN_COOKIE_NAME)}` },
            credentials: 'include',
            body: formData
        });

        return await response.json();
    } catch (err) {
        console.error('Upload failed:', err);
    }
  };

  // Handle image selection - create preview URL with validation
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type and size before processing
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      
      if (!validTypes.includes(file.type)) {
        alert('Please select a JPG, PNG or GIF image.');
        return;
      }

      setImageFile(file);
      
      // Create a temporary preview URL for the uploaded file
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (imageFile) {
      alert(`Submitting ${imageFile.name}`);  
      // Reset after submission
      setImageFile(null);
      setPreviewUrl('');

    } else {
      alert("Please select an image first.");
    }
    uploadImage()

  };


  return (
    <PageContainer>
      
      {/* Left column: Upload form */}
      <div style={{ 
        borderRight: "1px solid #cc3aff", 
        padding: '15px',
      }}>
        <h3 className="title">Upload Profile Image</h3>
        
        {/* File input for image upload with proper attributes */}
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '10px', padding: '8px' }}
          id="profile-image-upload"
          
        />


        {previewUrl && (
          <>
            {/* Image preview if a file is selected */}
            <ProfileImagePreview 
              src={previewUrl} 
              alt="Profile image - Preview of your uploaded photo"
            />

            <UploadButton onClick={handleSubmit}>
              Upload Profile Pictures
            </UploadButton>
          </>
        )}
      </div>


    </PageContainer>
  );
};
