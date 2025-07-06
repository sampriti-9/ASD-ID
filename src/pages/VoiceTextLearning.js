import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceTextLearning.css';

// ✅ Moved out to avoid recreation on every render
const suggestionWords = [
  { word: "Apple", emoji: "🍎" }, { word: "Happy", emoji: "😊" }, { word: "Rainbow", emoji: "🌈" }, { word: "Butterfly", emoji: "🦋" }, { word: "Star", emoji: "⭐" },
  { word: "Tree", emoji: "🌳" }, { word: "Sun", emoji: "☀️" }, { word: "Moon", emoji: "🌙" }, { word: "Mummy", emoji: "👩‍👧" }, { word: "Papa", emoji: "👨‍👧" },
  { word: "Sister", emoji: "👧" }, { word: "Brother", emoji: "👦" }, { word: "Doctor", emoji: "👩‍⚕️" }, { word: "Teacher", emoji: "👨‍🏫" }, { word: "Grandfather", emoji: "👴" },
  { word: "Grandmother", emoji: "👵" }, { word: "School", emoji: "🏫" }, { word: "Books", emoji: "📚" }, { word: "Pencil", emoji: "✏️" }, { word: "Ball", emoji: "⚽" },
  { word: "Elephant", emoji: "🐘" }, { word: "Car", emoji: "🚗" }, { word: "Dog", emoji: "🐶" }, { word: "Cat", emoji: "🐱" }, { word: "Ice Cream", emoji: "🍦" }, 
  { word: "Banana", emoji: "🍌" }
];


function VoiceTextLearning() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const [lastWord, setLastWord] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [rewardCount, setRewardCount] = useState(0);
  const [challengeWord, setChallengeWord] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [characterAnimations, setCharacterAnimations] = useState({
    position: 'right',
    mood: 'happy'
  });

  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  const setRandomChallengeWord = useCallback(() => {
    const randomWord = suggestionWords[Math.floor(Math.random() * suggestionWords.length)].word;
    setChallengeWord(randomWord);
  }, []);

  const celebrateSuccess = useCallback(() => {
    setShowSuccess(true);
    setRewardCount(prev => prev + 3);

    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }

    setCharacterAnimations({ position: 'center', mood: 'jump' });

    setTimeout(() => {
      setShowSuccess(false);
      setRandomChallengeWord();
      setCharacterAnimations({ position: 'right', mood: 'happy' });
    }, 4000);
  }, [setRandomChallengeWord]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setText(transcript);

        const words = transcript.split(' ');
        const newLastWord = words[words.length - 1].toLowerCase();

        if (newLastWord !== lastWord && newLastWord.trim() !== '') {
          setLastWord(newLastWord);
          setShowAnimation(true);

          if (challengeWord && newLastWord === challengeWord.toLowerCase()) {
            celebrateSuccess();
          }

          setTimeout(() => setShowAnimation(false), 1500);

          if (Math.random() > 0.7) {
            const moods = ['happy', 'excited', 'thinking'];
            const newMood = moods[Math.floor(Math.random() * moods.length)];
            setCharacterAnimations(prev => ({ ...prev, mood: newMood }));
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    audioRef.current = new Audio('/success-sound.mp3');
    setRandomChallengeWord();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [lastWord, challengeWord, celebrateSuccess, setRandomChallengeWord]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setCharacterAnimations(prev => ({ ...prev, mood: 'thinking' }));
    } else {
      setText('');
      setLastWord('');
      recognitionRef.current.start();
      setIsListening(true);
      setCharacterAnimations(prev => ({ ...prev, mood: 'excited' }));
    }
  };

  const showWordReward = (word) => {
    setLastWord(word);
    setShowReward(true);
    setRewardCount(prev => prev + 1);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => setShowReward(false), 3000);
  };

  const handleSuggestionClick = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
    showWordReward(word);
  };

  return (
    <div className="voice-learning-container">
      <div className="nav-header">
        <button className="back-button" onClick={() => navigate('/fun-learning')}>
          ← Back to Activities
        </button>
        <h1>Voice to Text Learning</h1>
        <div className="reward-badge">
          <span className="star-icon">⭐</span>
          <span className="reward-count">{rewardCount}</span>
        </div>
      </div>

      <div className="challenge-section">
        <h3>Can you say this word?</h3>
        <div className="challenge-word">
          {challengeWord} {suggestionWords.find(s => s.word === challengeWord)?.emoji}
        </div>
      </div>

      <div className="speech-container">
        <div className={`microphone-area ${isListening ? 'listening' : ''}`} onClick={toggleListening}>
          <div className="microphone-icon">🎤</div>
          <p>{isListening ? "I'm listening..." : "Tap to start speaking!"}</p>
          {isListening && (
            <div className="sound-waves">
              <div className="wave wave1"></div>
              <div className="wave wave2"></div>
              <div className="wave wave3"></div>
            </div>
          )}
        </div>

        <div className="text-display-area">
          <div className="text-result">
            {text.split(' ').map((word, index) => (
              <span
                key={index}
                className={`word ${word.toLowerCase() === lastWord ? 'word-pop' : ''} ${word.toLowerCase() === challengeWord.toLowerCase() ? 'challenge-match' : ''}`}
                onClick={() => showWordReward(word)}
              >
                {word}{' '}
              </span>
            ))}
          </div>
        </div>

        <div className={`character ${characterAnimations.position} ${characterAnimations.mood}`}>
          <div className="character-image"></div>
          {characterAnimations.mood === 'happy' && <div className="speech-bubble">Great job speaking!</div>}
          {characterAnimations.mood === 'excited' && <div className="speech-bubble">I can hear you!</div>}
          {characterAnimations.mood === 'thinking' && <div className="speech-bubble">Try saying something...</div>}
          {characterAnimations.mood === 'jump' && <div className="speech-bubble">Wow! You did it!</div>}
        </div>

        {showAnimation && lastWord && (
          <div className="floating-word-container">
            <div className="floating-word">{lastWord}</div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`sparkle sparkle-${i + 1}`}>✨</div>
            ))}
          </div>
        )}

        {showReward && (
          <div className="reward-popup">
            <div className="reward-content">
              <span className="reward-icon">🌟</span>
              <p>Great job saying this word!</p>
              <div className="star-burst"></div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-celebration">
            <div className="success-content">
              <h2>Amazing! 🎉</h2>
              <p>You said the challenge word correctly!</p>
              <div className="confetti-container">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className={`confetti confetti-${i % 5}`}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="word-suggestions">
        <h3>Try saying these words:</h3>
        <div className="suggestion-buttons">
          {suggestionWords.map((item, index) => (
            <button key={index} onClick={() => handleSuggestionClick(item.word)}>
              {item.word} {item.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="help-section">
        <h3>How to use:</h3>
        <ol>
          <li>Tap the microphone to start speaking</li>
          <li>Say words clearly into your device</li>
          <li>Try to say the challenge word</li>
          <li>Earn stars for each word you say!</li>
        </ol>
      </div>
    </div>
  );
}

export default VoiceTextLearning;
