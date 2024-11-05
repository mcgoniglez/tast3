// src/components/FileUpload.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Storage } from 'aws-amplify';

const FileUpload: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file && id) {
      const filename = `tasks/${id}/${file.name}`;
      try {
        await Storage.put(filename, file, {
          contentType: file.type,
        });
        // Optionally, update task in the backend with attachment info
        alert('File uploaded successfully');
      } catch (error) {
        console.error('File upload error', error);
      }
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
