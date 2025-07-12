import React, { useState, useEffect } from 'react';

const wordData = {
  a: [
    { word: 'cat', emoji: '😺', options: ['cat', 'bat', 'cap'], hint: 'Meows and has whiskers' },
    { word: 'bat', emoji: '🦇', options: ['bat', 'bag', 'can'], hint: 'Flies at night' },
    { word: 'cap', emoji: '🧢', options: ['cap', 'cat', 'can'], hint: 'You wear it on your head' },
  ],
  e: [
    { word: 'bed', emoji: '🛏️', options: ['bed', 'beg', 'bet'], hint: 'You sleep on it' },
    { word: 'pen', emoji: '🖊️', options: ['pen', 'pet', 'peg'], hint: 'You write with it' },
  ],
  i: [
    { word: 'pig', emoji: '🐷', options: ['pig', 'pin', 'pit'], hint: 'Says "oink oink"' },
    { word: 'lip', emoji: '👄', options: ['lip', 'lap', 'lit'], hint: 'Part of your mouth' },
  ],
  o: [
    { word: 'dog', emoji: '🐕', options: ['dog', 'dot', 'dig'], hint: 'Barks and wags tail' },
    { word: 'pot', emoji: '🍯', options: ['pot', 'pit', 'pat'], hint: 'You cook in it' },
  ],
  u: [
    { word: 'cup', emoji: '☕', options: ['cup', 'cub', 'cut'], hint: 'You drink from it' },
    { word: 'sun', emoji: '☀️', options: ['sun', 'sum', 'sub'], hint: 'Shines bright in sky' },
  ],
};

const encouragements = ['🎉 Amazing!', '🌟 Fantastic!', '💫 Super!', '🚀 Brilliant!', '⭐ Perfect!'];
const wrongMessages = ['🤔 Try again!', '💭 Think again!', '🔄 Give it another go!'];

const ThreeLetterWords = () => {
  const [category, setCategory] = useState('a');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const word = wordData[category][index];

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const createConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleAnswer = (option) => {
    if (!gameStarted) setGameStarted(true);
    setSelected(option);
    
    if (option === word.word) {
      const points = streak >= 5 ? 20 : 10;
      setScore(score + points);
      setStreak(streak + 1);
      setFeedback(encouragements[Math.floor(Math.random() * encouragements.length)]);
      speak("Correct! Well done!");
      createConfetti();
      
      setTimeout(() => {
        setFeedback('');
        setSelected(null);
        setHintVisible(false);
        setIndex((index + 1) % wordData[category].length);
      }, 1500);
    } else {
      setStreak(0);
      setFeedback(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
      speak("Oops! Try again");
      setTimeout(() => {
        setFeedback('');
        setSelected(null);
      }, 1000);
    }
  };

  const changeCategory = (cat) => {
    setCategory(cat);
    setIndex(0);
    setSelected(null);
    setHintVisible(false);
    setStreak(0);
    speak(`Let's learn ${cat.toUpperCase()} words!`);
  };

  const resetGame = () => {
    setScore(0);
    setIndex(0);
    setSelected(null);
    setHintVisible(false);
    setStreak(0);
    setGameStarted(false);
    speak("Game reset! Let's start fresh!");
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Comic Sans MS', 'Poppins', cursive",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {['🌟', '⭐', '🎈', '🎉', '🚀', '💫'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animation: `confetti-fall ${1 + Math.random()}s ease-out`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              {['🎉', '🎊', '⭐', '🌟', '💫', '🎈'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg animate-pulse">
            🎈 Learn 3-Letter Words! 🎈
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
            <span className="text-white text-xl font-semibold">Score: {score}</span>
            {streak > 0 && (
              <span className="ml-4 text-yellow-300 text-lg">
                🔥 Streak: {streak}
              </span>
            )}
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {Object.keys(wordData).map((cat) => (
            <button
              key={cat}
              className={`w-16 h-16 rounded-full text-2xl font-bold transition-all duration-300 transform hover:scale-110 ${
                category === cat 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110 animate-bounce' 
                  : 'bg-white/80 text-purple-600 hover:bg-white'
              }`}
              onClick={() => changeCategory(cat)}
              style={{
                boxShadow: category === cat ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Main Game Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center max-w-2xl mx-auto">
          {/* Emoji Display */}
          <div 
            className="text-8xl mb-6 cursor-pointer transition-transform duration-300 hover:scale-125 select-none"
            onClick={() => speak(word.word)}
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              animation: selected === word.word ? 'bounce 0.6s' : 'none'
            }}
          >
            {word.emoji}
          </div>

          {/* Hint */}
          {hintVisible && (
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg animate-fadeIn">
              <p className="text-lg text-orange-800 font-medium">💡 {word.hint}</p>
            </div>
          )}

          {/* Options */}
          <div className="space-y-4 mb-6">
            {word.options.map((opt, i) => (
              <button
                key={i}
                className={`w-full py-4 px-6 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selected === opt
                    ? opt === word.word
                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg animate-pulse'
                      : 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg animate-shake'
                    : 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 shadow-md'
                }`}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                style={{
                  boxShadow: selected === opt && opt === word.word ? '0 8px 25px rgba(34, 197, 94, 0.4)' : 
                            selected === opt ? '0 8px 25px rgba(239, 68, 68, 0.4)' : 
                            '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            <button 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
              onClick={() => speak(word.hint)}
            >
              🔊 Hear Hint
            </button>
            <button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
              onClick={() => setHintVisible(true)}
            >
              💭 Show Hint
            </button>
            <button 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
              onClick={resetGame}
            >
              🔄 Reset
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`text-2xl font-bold mb-4 ${
              feedback.includes('🎉') || feedback.includes('🌟') || feedback.includes('💫') || feedback.includes('🚀') || feedback.includes('⭐')
                ? 'text-green-600 animate-bounce' 
                : 'text-red-500 animate-shake'
            }`}>
              {feedback}
            </div>
          )}

          {/* Progress */}
          <div className="text-sm text-gray-600">
            Word {index + 1} of {wordData[category].length} in "{category.toUpperCase()}" category
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes confetti-fall {
          0% { 
            transform: translateY(-100vh) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(100vh) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0);
          }
          20%, 80% {
            transform: translate3d(2px, 0, 0);
          }
          30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
          }
          40%, 60% {
            transform: translate3d(4px, 0, 0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shake {
          animation: shake 0.5s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ThreeLetterWords;