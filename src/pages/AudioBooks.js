import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AudioBooks.css';

function AudioBooks() {
  const navigate = useNavigate();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio books data organized by age groups with updated audioSrc format
  const audioBooks = {
    "3-5": [
      {
        id: 1,
        title: "The Rainbow Fish",
        coverImage: "/images/books/rainbow-fish.jpg",
        audioSrc: "/audio/rainbow-fish.mp3", // Make sure this file exists exactly as named
        duration: "5:30",
        description: "A colorful fish learns to share his beautiful scales with friends",
        complexity: "Simple",
        theme: "Sharing"
      },
      {
        id: 2,
        title: "Five Little Ducks",
        coverImage: "/images/books/five-ducks.jpg",
        audioSrc: "/audio/little-ducks.mp3", // Using a test audio file that should exist
        duration: "4:15",
        description: "A counting story about ducks who go on an adventure",
        complexity: "Simple",
        theme: "Counting"
      },
      {
        id: 3,
        title: "The Very Hungry Caterpillar",
        coverImage: "/images/books/hungry-caterpillar.jpg",
        audioSrc: "/audio/The-hungry-caterpillar.mp3", // Using an external sample audio
        duration: "6:20",
        description: "A caterpillar eats through different foods before becoming a butterfly",
        complexity: "Simple",
        theme: "Growth & Change"
      }
    ],
    "6-9": [
      {
        id: 4,
        title: "The Feelings Book",
        coverImage: "/images/books/feelings-book.jpg",
        audioSrc: "/audio/feelings-book.mp3",
        duration: "8:45",
        description: "Learn about different emotions through relatable stories",
        complexity: "Intermediate",
        theme: "Emotions"
      },
      {
        id: 5,
        title: "My Five Senses",
        coverImage: "/images/books/five-senses.jpg",
        audioSrc: "/audio/five-senses.mp3",
        duration: "7:30",
        description: "Explore how we use our senses to experience the world",
        complexity: "Intermediate",
        theme: "Senses"
      },
      {
        id: 6,
        title: "Animal Friends",
        coverImage: "/images/books/animal-friends.jpg",
        audioSrc: "/audio/animal-friends.mp3",
        duration: "9:15",
        description: "Stories about different animals and their unique traits",
        complexity: "Intermediate",
        theme: "Animals"
      }
    ],
    "10-15": [
      {
        id: 7,
        title: "Social Stories: Making Friends",
        coverImage: "/images/books/making-friends.jpg",
        audioSrc: "/audio/making-friends.mp3",
        duration: "12:20",
        description: "Learning how to make friends and navigate social situations",
        complexity: "Advanced",
        theme: "Social Skills"
      },
      {
        id: 8,
        title: "Understanding My Emotions",
        coverImage: "/images/books/understanding-emotions.jpg",
        audioSrc: "/audio/understanding-emotions.mp3",
        duration: "11:45",
        description: "A guide to recognizing and managing different emotions",
        complexity: "Advanced",
        theme: "Self-regulation"
      },
      {
        id: 9,
        title: "My Daily Routine",
        coverImage: "/images/books/daily-routine.jpg",
        audioSrc: "/audio/daily-routine.mp3",
        duration: "10:30",
        description: "A story about following schedules and routines",
        complexity: "Advanced",
        theme: "Life Skills"
      }
    ]
  };

  // Function to get all books across age groups
  const getAllBooks = () => {
    return [
      ...audioBooks["3-5"],
      ...audioBooks["6-9"],
      ...audioBooks["10-15"]
    ];
  };

  // Function to get books based on selected age group
  const getFilteredBooks = () => {
    if (selectedAgeGroup === 'all') {
      return getAllBooks();
    }
    return audioBooks[selectedAgeGroup] || [];
  };

  // Create a ref for the audio element
  const [audioElement, setAudioElement] = useState(new Audio());

  // Function to handle audio playback
  const handlePlayPause = (book) => {
    if (currentlyPlaying === book.id) {
      // Toggle play/pause on the current audio
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch(error => {
          console.error("Error playing audio:", error);
          alert("There was an error playing this audio book. Please try again.");
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      // Stop any currently playing audio
      if (currentlyPlaying !== null) {
        audioElement.pause();
      }
      
      try {
        // Log the audio path being attempted
        console.log("Attempting to play audio from:", book.audioSrc);
        
        // Create and play new audio with process.env.PUBLIC_URL to ensure correct path
        const audioPath = book.audioSrc.startsWith('http') 
          ? book.audioSrc 
          : process.env.PUBLIC_URL + book.audioSrc;
        
        console.log("Full audio path:", audioPath);
        
        const newAudio = new Audio(audioPath);
        
        // Debug audio events
        newAudio.addEventListener('loadstart', () => console.log('Audio loading started'));
        newAudio.addEventListener('canplaythrough', () => console.log('Audio can play through'));
        newAudio.addEventListener('error', (e) => {
          console.error("Audio load error:", e);
          console.error("Error code:", newAudio.error ? newAudio.error.code : "unknown");
          alert("There was an error loading this audio book. Please check the console for details.");
        });
        
        newAudio.addEventListener('ended', () => {
          console.log('Audio playback ended');
          setIsPlaying(false);
        });
        
        // Set volume appropriate for children
        newAudio.volume = 0.7;
        
        // Play the audio
        console.log("Attempting to play audio...");
        newAudio.play().then(() => {
          console.log("Audio playback started successfully");
        }).catch(error => {
          console.error("Error playing audio:", error);
          alert("There was an error playing this audio book. Please try again.");
        });
        
        setAudioElement(newAudio);
        setCurrentlyPlaying(book.id);
        setIsPlaying(true);
      } catch (error) {
        console.error("Exception during audio setup:", error);
        alert("There was an unexpected error with the audio. Please try again later.");
      }
    }
  };

  // Go back to main menu
  const handleBackClick = () => {
    navigate('/');
  };

  // Cleanup effect for audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [audioElement]);
  
  return (
    <div className="audio-books-container">
      <div className="audio-books-header">
        <button className="back-button" onClick={handleBackClick}>
          <span className="back-arrow">←</span> Back
        </button>
        <h1>
          <span className="audio-icon">🔊</span> Audio Books
        </h1>
        <p>Listen to engaging stories with visual support. Perfect for developing listening skills and imagination.</p>
      </div>

      <div className="age-filter">
        <button 
          className={selectedAgeGroup === 'all' ? 'active' : ''} 
          onClick={() => setSelectedAgeGroup('all')}
        >
          All Ages
        </button>
        <button 
          className={selectedAgeGroup === '3-5' ? 'active' : ''} 
          onClick={() => setSelectedAgeGroup('3-5')}
        >
          Ages 3-5
        </button>
        <button 
          className={selectedAgeGroup === '6-9' ? 'active' : ''} 
          onClick={() => setSelectedAgeGroup('6-9')}
        >
          Ages 6-9
        </button>
        <button 
          className={selectedAgeGroup === '10-15' ? 'active' : ''} 
          onClick={() => setSelectedAgeGroup('10-15')}
        >
          Ages 10-15
        </button>
      </div>

      <div className="books-grid">
        {getFilteredBooks().map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-cover">
              <div className="placeholder-cover" style={{backgroundColor: book.id % 3 === 0 ? '#FFD6E0' : book.id % 3 === 1 ? '#C7EEFF' : '#DFFFD6'}}>
                <span className="book-emoji">📚</span>
                <span className="book-title-overlay">{book.title}</span>
              </div>
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="book-description">{book.description}</p>
              <div className="book-details">
                <span className="book-tag">{book.complexity}</span>
                <span className="book-tag">{book.theme}</span>
                <span className="book-duration">⏱️ {book.duration}</span>
              </div>
              <div className="audio-controls">
                <button 
                  className={`play-button ${currentlyPlaying === book.id ? 'playing' : ''}`}
                  onClick={() => handlePlayPause(book)}
                >
                  {currentlyPlaying === book.id && isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                {currentlyPlaying === book.id && (
                  <div className="volume-control">
                    <label htmlFor={`volume-${book.id}`}>🔊</label>
                    <input 
                      type="range" 
                      id={`volume-${book.id}`} 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      defaultValue="0.7"
                      onChange={(e) => {
                        if (audioElement) {
                          audioElement.volume = e.target.value;
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="teacher-note">
        <h3>👩‍🏫 Teacher Guide</h3>
        <p>
          These audio books are designed to be played by the teacher while students follow along.
          Each book includes visual supports and addresses specific developmental needs.
        </p>
        <ul>
          <li>Encourage students to respond to prompts during the story</li>
          <li>Pause at key moments to check comprehension</li>
          <li>Use the stories as starting points for related activities</li>
        </ul>
      </div>
    </div>
  );
}

export default AudioBooks;