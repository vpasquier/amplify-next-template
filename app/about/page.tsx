"use client";

import Link from "next/link";
import { uploadData } from "aws-amplify/storage";
import { useState, useRef } from "react";

export default function AboutPage() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);
    try {
      const fileReader = new FileReader();
      
      fileReader.onload = async (event) => {
        try {
          const result = event.target?.result;
          if (!result) {
            throw new Error("Failed to read file");
          }
          console.log("Complete File read successfully!", result);
          await uploadData({
            data: result,
            path: `picture-submissions/${file.name}`
          });
          alert("File uploaded successfully!");
        } catch (e) {
          console.log("error", e);
          alert("Upload failed. Please try again.");
        } finally {
          setIsUploading(false);
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (e) {
      console.log("error", e);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <main>
      <h1>About Us</h1>
      <p>Welcome to our amazing application! This is the about page where you can learn more about what we do.</p>
      
      <div style={{ marginTop: 24 }}>
        <h2>File Upload</h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ marginBottom: 8 }}
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={isUploading}
          style={{
            padding: '8px 16px',
            backgroundColor: isUploading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isUploading ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <h2>Features</h2>
        <ul>
          <li>Todo management</li>
          <li>Calculator functionality</li>
          <li>User authentication</li>
          <li>Data persistence</li>
        </ul>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <Link href="/" style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
