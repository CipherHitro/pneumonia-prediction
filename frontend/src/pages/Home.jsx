import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import PredictionResult from '../components/PredictionResult';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelected = (file, url) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    // Reset previous states when new image is uploaded
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL  || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${backendUrl}/predict`, { 
        method: 'POST', 
        body: formData 
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      setPrediction(data);
      
    } catch (err) {
      console.error(err);
      setError("Failed to process the image. Please check if the backend is running and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header */}
      <div className="max-w-3xl w-full space-y-2 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white p-2">
          Pneumonia <span className="text-emerald-400">Prediction</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          AI-powered diagnostic assistance tool. Upload a chest X-Ray image below to get an instant preliminary detection analysis.
        </p>
      </div>

      {/* Main Content Area */}
      <main className="w-full flex-grow flex flex-col items-center">
        
        {/* Step 1: Upload Image */}
        <ImageUploader onImageUpload={handleImageSelected} />

        {/* Step 2: Action Button */}
        {selectedFile && (
          <div className="mt-8">
            <button
              onClick={handlePredict}
              disabled={isLoading}
              className={`px-8 py-3 rounded-md font-bold text-lg transition-transform focus:outline-none focus:ring-4 focus:ring-emerald-500/50 
                ${isLoading 
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-900 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                }`}
            >
              {isLoading ? 'Processing...' : 'Analyze Image'}
            </button>
          </div>
        )}

        {/* Step 3: Result Component */}
        <PredictionResult 
          isLoading={isLoading} 
          prediction={prediction} 
          error={error} 
        />
        
      </main>

      {/* Footer */}
      <footer className="mt-20 w-full text-center pb-6">
        <p className="text-neutral-600 text-sm">
          &copy; {new Date().getFullYear()} AI Diagnostic Team. Research tool only.
        </p>
      </footer>
    </div>
  );
};

export default Home;