"use client";

import { useState, useEffect, useRef } from 'react';

const VideoPlayer = ({ embedUrl }) => {
  const [showAd, setShowAd] = adState();
  const [canSkip, setCanSkip] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  function adState() {
    return useState(true); // Always show ad first for demonstration
  }

  useEffect(() => {
    if (showAd) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showAd]);

  const handleSkip = () => {
    setShowAd(false);
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      {showAd ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-sm">
            Advertisement
          </div>
          
          {/* Ad Placeholder content */}
          <div className="w-full h-full flex flex-col items-center justify-center animate-pulse bg-gray-800">
            <p className="text-xl md:text-3xl font-bold mb-4">Your Ad Here (VAST/VMAP Integration)</p>
            <p className="text-gray-400">Wait to skip...</p>
          </div>

          <div className="absolute bottom-6 right-6">
            {canSkip ? (
              <button 
                onClick={handleSkip}
                className="bg-white/20 hover:bg-white/30 border border-white/50 text-white px-6 py-2 flex items-center transition"
              >
                Skip Ad
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <div className="bg-black/60 px-4 py-2 border border-gray-600 text-gray-300">
                You can skip to video in {timeLeft}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Main Video Source (Iframe Embed) */}
      {!showAd && (
        <iframe
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
