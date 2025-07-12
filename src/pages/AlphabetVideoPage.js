import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const AlphabetVideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="alphabet-page">
      <div className="alphabet-header">
        <h1>🎬 Alphabet Adventure</h1>
        <p>Let's learn the ABC's together! 🌟</p>
      </div>

      <div className="alphabet-video-container">
        <video
          ref={videoRef}
          className="alphabet-video"
          controls
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/videos/VideoABCD.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="controls">
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button onClick={handleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isMuted ? 'Unmute' : 'Mute'}
          </button>

          <button onClick={handleRestart}>
            <RotateCcw size={20} />
            Restart
          </button>
        </div>
      </div>

      {/* Embedded CSS */}
      <style jsx="true">{`
        .alphabet-page {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          min-height: 100vh;
          padding: 40px 20px;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          text-align: center;
        }

        .alphabet-header h1 {
          font-size: 3.5rem;
          background: linear-gradient(45deg, #e91e63, #9c27b0, #3f51b5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .alphabet-header p {
          font-size: 1.2rem;
          color: #444;
          margin-bottom: 30px;
        }

        .alphabet-video-container {
          background: white;
          border-radius: 20px;
          padding: 30px;
          max-width: 800px;
          margin: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .alphabet-video {
          width: 100%;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .controls {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .controls button {
          padding: 12px 20px;
          border: none;
          border-radius: 25px;
          background-color: #ec4899;
          color: white;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
          transition: all 0.3s ease;
        }

        .controls button:hover {
          transform: translateY(-2px);
          background-color: #db2777;
        }

        @media (max-width: 768px) {
          .alphabet-header h1 {
            font-size: 2rem;
          }

          .controls {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AlphabetVideoPage;
