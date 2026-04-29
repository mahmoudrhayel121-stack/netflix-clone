"use client";

import { useState, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoUrl, posterUrl, subtitles }) => {
  const [showAd, setShowAd] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);

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

  useEffect(() => {
    // Initialize Video.js when ad finishes
    if (!showAd && !playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.classList.add('vjs-theme-city'); // or default
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        poster: posterUrl,
        sources: [{
          src: videoUrl,
          type: videoUrl?.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
        }],
        tracks: subtitles || [],
        playbackRates: [0.5, 1, 1.25, 1.5, 2]
      }, () => {
        videojs.log('player is ready');
      });

      return () => {
        if (player && !player.isDisposed()) {
          player.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [showAd, videoUrl, posterUrl, subtitles]);

  const handleSkip = () => {
    setShowAd(false);
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Premium Netflix-style CSS overrides for Video.js */}
      <style jsx global>{`
        .video-js .vjs-control-bar {
          background-color: rgba(0, 0, 0, 0.7) !important;
          height: 4em !important;
        }
        .video-js .vjs-big-play-button {
          background-color: rgba(229, 9, 20, 0.9) !important;
          border-color: rgba(229, 9, 20, 0.9) !important;
          border-radius: 50% !important;
          width: 2.5em !important;
          height: 2.5em !important;
          line-height: 2.5em !important;
          margin-top: -1.25em !important;
          margin-left: -1.25em !important;
        }
        .video-js .vjs-slider {
          background-color: rgba(255, 255, 255, 0.3) !important;
        }
        .video-js .vjs-play-progress {
          background-color: #E50914 !important;
        }
        .video-js .vjs-text-track-display {
          bottom: 4em !important;
        }
      `}</style>

      {showAd ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-sm">
            Advertisement
          </div>
          
          <div className="w-full h-full flex flex-col items-center justify-center animate-pulse bg-gray-800">
            <p className="text-xl md:text-3xl font-bold mb-4">NETFLIX PREMIUM PLAYER</p>
            <p className="text-gray-400">Loading high-quality stream...</p>
          </div>

          <div className="absolute bottom-6 right-6">
            {canSkip ? (
              <button 
                onClick={handleSkip}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded flex items-center transition"
              >
                Skip Intro
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <div className="bg-black/60 px-4 py-2 rounded border border-gray-600 text-gray-300">
                Starting in {timeLeft}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {!showAd && (
        <div data-vjs-player className="w-full h-full">
          <div ref={videoRef} className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
