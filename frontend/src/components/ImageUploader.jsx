import React, { useCallback, useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.match('image.*')) {
      alert("Please upload an image file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      if (onImageUpload) {
        onImageUpload(file, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div
        className={`relative border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-colors duration-300 ease-in-out cursor-pointer
          ${isDragging 
            ? 'border-emerald-400 bg-neutral-900' 
            : 'border-neutral-600 bg-neutral-900/50 hover:border-emerald-500/80 hover:bg-neutral-900'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {preview ? (
          <div className="flex flex-col items-center">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-64 object-contain rounded-md shadow-lg border border-neutral-700 mb-4" 
            />
            <p className="text-emerald-400 font-medium tracking-wide">Click or drag to change image</p>
          </div>
        ) : (
          <div className="text-center text-neutral-400">
            <svg className="mx-auto h-16 w-16 mb-4 text-emerald-500 opacity-80" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-1 text-lg">Drag & drop your X-ray image here</p>
            <p className="mt-2 text-sm text-neutral-500">or click to browse from your computer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
