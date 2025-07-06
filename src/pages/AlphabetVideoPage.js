import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const AlphabetVideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      fontFamily: 'Comic Sans MS, cursive, sans-serif',
      padding: '20px'
    }}>
      {/* Floating Decorations */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '60px',
        height: '60px',
        backgroundColor: '#ffeb3b',
        borderRadius: '50%',
        opacity: 0.7,
        animation: 'bounce 2s infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '150px',
        right: '80px',
        width: '40px',
        height: '40px',
        backgroundColor: '#e91e63',
        borderRadius: '50%',
        opacity: 0.7,
        animation: 'bounce 2s infinite 0.5s'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '100px',
        width: '50px',
        height: '50px',
        backgroundColor: '#2196f3',
        borderRadius: '50%',
        opacity: 0.7,
        animation: 'bounce 2s infinite 1s'
      }}></div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #e91e63, #9c27b0, #3f51b5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            🎬 Alphabet Adventure
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: '#666',
            fontWeight: '500'
          }}>
            Let's learn the ABC's together! 🌟
          </p>
        </div>

        {/* Video Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '25px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          marginBottom: '40px',
          transform: isPlaying ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          
          {/* Video Player */}
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23f0f9ff'/%3E%3Ctext x='400' y='200' font-family='Arial' font-size='48' fill='%23ec4899' text-anchor='middle'%3E🎬%3C/text%3E%3Ctext x='400' y='260' font-family='Arial' font-size='24' fill='%236b7280' text-anchor='middle'%3EAlphabet Learning Video%3C/text%3E%3Ctext x='400' y='300' font-family='Arial' font-size='18' fill='%239ca3af' text-anchor='middle'%3EClick to play%3C/text%3E%3C/svg%3E"
            >
              <source src="/videos/VideoABCD.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Custom Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '30px'
          }}>
            <button
              onClick={handlePlayPause}
              style={{
                padding: '15px 25px',
                backgroundColor: '#e91e63',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={handleMute}
              style={{
                padding: '15px 25px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {isMuted ? 'Unmute' : 'Mute'}
            </button>

            <button
              onClick={handleRestart}
              style={{
                padding: '15px 25px',
                backgroundColor: '#3f51b5',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(63, 81, 181, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <RotateCcw size={20} />
              Restart
            </button>
          </div>

          {/* Fun Facts Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ffebee, #fce4ec)',
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔤</div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#e91e63', 
                marginBottom: '10px' 
              }}>
                26 Letters
              </h3>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Learn all the letters of the alphabet!
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎵</div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#9c27b0', 
                marginBottom: '10px' 
              }}>
                Fun Songs
              </h3>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Catchy tunes to help you remember!
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #e8eaf6, #c5cae9)',
              padding: '25px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌟</div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#3f51b5', 
                marginBottom: '10px' 
              }}>
                Interactive
              </h3>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Engaging and educational content!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'white',
            padding: '15px 30px',
            borderRadius: '50px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#333'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎉</span>
            Ready to learn? Press play above!
            <span style={{ fontSize: '1.5rem' }}>📚</span>
          </div>
        </div>
      </div>

      {/* Floating Letters */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        fontSize: '4rem',
        color: '#e91e63',
        opacity: 0.1,
        fontWeight: 'bold',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none'
      }}>A</div>
      
      <div style={{
        position: 'fixed',
        top: '20%',
        right: '10%',
        fontSize: '4rem',
        color: '#9c27b0',
        opacity: 0.1,
        fontWeight: 'bold',
        animation: 'float 8s ease-in-out infinite 2s',
        pointerEvents: 'none'
      }}>B</div>
      
      <div style={{
        position: 'fixed',
        bottom: '30%',
        left: '8%',
        fontSize: '4rem',
        color: '#3f51b5',
        opacity: 0.1,
        fontWeight: 'bold',
        animation: 'float 6s ease-in-out infinite 4s',
        pointerEvents: 'none'
      }}>C</div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        
        button:hover {
          transform: translateY(-2px) !important;
        }
        
        @media (max-width: 768px) {
          h1 { font-size: 2.5rem !important; }
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AlphabetVideoPage;