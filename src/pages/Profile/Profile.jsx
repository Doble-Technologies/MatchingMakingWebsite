import React, { useState } from 'react';
import styled from "@emotion/styled";


const PageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "24% 50% 24%",
  padding: "10px",
  gap: "1%",

});

// Simple button component without theme dependencies
const UploadButton = styled.button`
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
`;


export const Profile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(() => ''); 

  // Handle image selection - create preview URL
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      
      // Create a temporary preview URL for the uploaded file
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageUpload = (e) => {
    console.log("UPLOAD IMAGE HERE");
  }

  const handleUpload = () => {
    if (imageFile) {
      console.log('Uploading:', imageFile.name);
      alert(`Submitting ${imageFile.name}`);
      
      // Reset after submission
      setImageFile(null);
      setPreviewUrl('');
    } else {
      alert("Please select an image first.");
    }
  };


  return (
    <PageContainer>
      
      {/* Left column: Upload form */}
      <div style={{ 
        borderRight: "1px solid #ddd", 
        padding: '15px',
      }}>
        <h3>Upload Profile Image</h3>
        
        {/* File input for image upload */}
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
            <img 
              src={previewUrl} 
              alt="Profile image"
              style={{ 
                maxWidth: "100%", 
                maxHeight: "200px", 
                marginTop: "15px", 
                borderRadius: "8px" 
              }}
            />

            <UploadButton onSubmit={handleImageUpload}onClick={handleUpload}>
              Upload
            </UploadButton>
          </>
        )}
      </div>

      {/* Center column - existing content */}
      <p style={{ textAlign: "center" }}>Pro</p>

    </PageContainer>
  );
};


// Export previewUrl state helper if needed outside the component (for TypeScript or testing)
export const { handleImageChange } = {}; 
