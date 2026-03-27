import React from 'react';

const PredictionResult = ({ isLoading, prediction, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-lg shadow-xl border border-neutral-700 text-center animate-pulse">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent mb-4"></div>
        <h3 className="text-xl font-semibold text-neutral-200">Analyzing X-Ray...</h3>
        <p className="text-neutral-400 mt-2">Running prediction model, please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-red-900/30 rounded-lg shadow-xl border border-red-500/50 text-center">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Analysis Failed</h3>
        <p className="text-neutral-300">{error}</p>
      </div>
    );
  }

  if (!prediction) return null;

  const isPneumonia = prediction.label.toLowerCase() === 'pneumonia';

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-lg shadow-xl border border-neutral-700">
      <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center justify-between border-b border-neutral-700 pb-4 text-white">
        Diagnostic Results
        <span className={`px-3 py-1 text-sm rounded-full font-bold ${isPneumonia ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
          {prediction.label}
        </span>
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-neutral-400 font-medium">Confidence Score</span>
            <span className="text-emerald-400 font-bold">{(prediction.confidence * 100).toFixed(2)}%</span>
          </div>
          <div className="w-full bg-black rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${isPneumonia ? 'bg-red-500' : 'bg-emerald-500'}`} 
              style={{ width: `${prediction.confidence * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-6 p-4 rounded bg-black/50 border border-neutral-700/50">
          <p className="text-neutral-300 text-sm leading-relaxed">
            <strong className="text-neutral-100 block mb-1">Note:</strong>
            {isPneumonia 
              ? "The model has detected patterns consistent with Pneumonia. However, this is just an AI-assisted prediction. Please consult a qualified radiologist or physician for a definitive clinical diagnosis and treatment plan."
              : "No strong indications of Pneumonia were found in this X-ray. For safety and comprehensive medical evaluation, please review the results with a healthcare professional."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;