import React, { useState } from 'react';
import { Trophy, Heart, Sparkles, RotateCcw, CheckCircle, XCircle, Volume2 } from 'lucide-react';

const wordData = {
  a: [
    { word: 'cat', emoji: '😺', options: ['cat', 'bat', 'cap'], hint: 'Meows and has whiskers' },
    { word: 'bat', emoji: '🦇', options: ['bat', 'bag', 'can'], hint: 'Flies at night' },
    { word: 'cap', emoji: '🧢', options: ['cap', 'cat', 'can'], hint: 'You wear it on your head' },
    { word: 'bag', emoji: '👜', options: ['bag', 'bat', 'bad'], hint: 'You carry things in it' },
    { word: 'mat', emoji: '🧽', options: ['mat', 'map', 'man'], hint: 'You wipe your feet on it' },
    { word: 'fan', emoji: '🌀', options: ['fan', 'fat', 'far'], hint: 'Keeps you cool' }
  ],
  e: [
    { word: 'bed', emoji: '🛏️', options: ['bed', 'beg', 'bet'], hint: 'You sleep on it' },
    { word: 'red', emoji: '🔴', options: ['red', 'led', 'fed'], hint: 'The color of a rose' },
    { word: 'pen', emoji: '🖊️', options: ['pen', 'pet', 'peg'], hint: 'You write with it' },
    { word: 'hen', emoji: '🐔', options: ['hen', 'den', 'men'], hint: 'A female chicken' },
    { word: 'net', emoji: '🥅', options: ['net', 'new', 'nut'], hint: 'Used to catch fish' },
    { word: 'web', emoji: '🕸️', options: ['web', 'wet', 'wed'], hint: 'Spider makes this' }
  ],
  i: [
    { word: 'pig', emoji: '🐷', options: ['pig', 'pin', 'pit'], hint: 'Says "oink oink"' },
    { word: 'lip', emoji: '👄', options: ['lip', 'lap', 'lit'], hint: 'Part of your mouth' },
    { word: 'big', emoji: '🐘', options: ['big', 'bag', 'bug'], hint: 'The opposite of small' },
    { word: 'win', emoji: '🏆', options: ['win', 'wit', 'wig'], hint: 'The opposite of lose' },
    { word: 'kid', emoji: '👶', options: ['kid', 'kit', 'kip'], hint: 'A young person' },
    { word: 'zip', emoji: '🤐', options: ['zip', 'zap', 'zoo'], hint: 'Fastener on clothes' }
  ],
  o: [
    { word: 'dog', emoji: '🐕', options: ['dog', 'dot', 'dig'], hint: 'Barks and wags its tail' },
    { word: 'pot', emoji: '🍯', options: ['pot', 'pit', 'pat'], hint: 'You cook in it' },
    { word: 'top', emoji: '🔝', options: ['top', 'tip', 'tap'], hint: 'The highest part' },
    { word: 'box', emoji: '📦', options: ['box', 'fox', 'boy'], hint: 'You store things in it' },
    { word: 'fox', emoji: '🦊', options: ['fox', 'fix', 'fog'], hint: 'A clever orange animal' },
    { word: 'log', emoji: '🪵', options: ['log', 'lot', 'low'], hint: 'A piece of wood' }
  ],
  u: [
    { word: 'cup', emoji: '☕', options: ['cup', 'cub', 'cut'], hint: 'You drink from it' },
    { word: 'sun', emoji: '☀️', options: ['sun', 'sum', 'sub'], hint: 'Shines bright in the sky' },
    { word: 'bus', emoji: '🚌', options: ['bus', 'but', 'bug'], hint: 'Takes you to school' },
    { word: 'run', emoji: '🏃', options: ['run', 'rum', 'rub'], hint: 'Move your legs fast' },
    { word: 'bug', emoji: '🐛', options: ['bug', 'bun', 'but'], hint: 'A small insect' },
    { word: 'fun', emoji: '🎉', options: ['fun', 'fur', 'fud'], hint: 'Having a good time' }
  ],
  consonants: [
    { word: 'mom', emoji: '👩', options: ['mom', 'mop', 'mud'], hint: 'She takes care of you' },
    { word: 'dad', emoji: '👨', options: ['dad', 'dog', 'dug'], hint: 'He takes care of you too' },
    { word: 'wow', emoji: '😮', options: ['wow', 'win', 'web'], hint: 'Expression of surprise' },
    { word: 'pop', emoji: '🍿', options: ['pop', 'pot', 'pip'], hint: 'Sound a balloon makes' },
    { word: 'tot', emoji: '👶', options: ['tot', 'top', 'tap'], hint: 'A very young child' },
    { word: 'bib', emoji: '🍼', options: ['bib', 'big', 'bit'], hint: 'Baby wears this when eating' }
  ]
};

const encouragements = [
  "🌟 Amazing!", "🎉 Fantastic!", "✨ Brilliant!", "🚀 Superb!",
  "🏆 Excellent!", "💫 Outstanding!", "🌈 Wonderful!", "⭐ Perfect!"
];

const tryAgainMessages = [
  "🤔 Think again!", "💭 You're close!", "🔄 Try again!", "💪 You can do it!"
];

const celebrationPhrases = [
  "Great work!", "Awesome job!", "Well done!", "Fantastic!", 
  "You're amazing!", "Keep it up!", "Brilliant!", "Outstanding!"
];

const ThreeLetterWords = () => {
  const [selectedCategory, setSelectedCategory] = useState('a');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hearts, setHearts] = useState(5);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentWord = wordData[selectedCategory][currentIndex];

  // Text-to-Speech function
  const speak = (text, rate = 1) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getRandomCelebration = () => {
    return celebrationPhrases[Math.floor(Math.random() * celebrationPhrases.length)];
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    
    if (option === currentWord.word) {
      const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      setFeedback({ text: encouragement, isCorrect: true });
      
      // Voice celebration
      const celebration = getRandomCelebration();
      speak(celebration);
      
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
        setShowCelebration(false);
        setCurrentIndex((prev) => (prev + 1) % wordData[selectedCategory].length);
        setShowHint(false);
      }, 2000);
    } else {
      const encouragement = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
      setFeedback({ text: encouragement, isCorrect: false });
      
      // Voice encouragement
      speak("Try again, you can do it!");
      
      setStreak(0);
      setHearts(prev => Math.max(0, prev - 1));
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setHearts(5);
    setCurrentIndex(0);
    setFeedback(null);
    setSelectedAnswer(null);
    setShowHint(false);
    setShowCelebration(false);
    speak("Game reset! Let's start again!");
  };

  const switchCategory = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setFeedback(null);
    setSelectedAnswer(null);
    setShowHint(false);
    setShowCelebration(false);
  };

  const speakWord = () => {
    speak(currentWord.word, 0.8);
  };

  const speakHint = () => {
    speak(currentWord.hint, 0.9);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">🧠</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Three Letter Word Adventure
            </h1>
          </div>
          
          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Trophy className="text-yellow-500" size={20} />
              <span className="font-semibold text-gray-700">{score}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Sparkles className="text-purple-500" size={20} />
              <span className="font-semibold text-gray-700">{streak}</span>
            </div>
            
            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className={`${i < hearts ? 'text-red-500 fill-current' : 'text-gray-300'}`}
                  size={16}
                />
              ))}
            </div>

            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border transition-all duration-200 ${
                voiceEnabled ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              <Volume2 size={16} />
              <span className="text-sm font-medium">{voiceEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-sm transition-all duration-200"
            >
              <RotateCcw size={16} />
              <span className="text-sm font-medium">Reset</span>
            </button>
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center gap-2 mb-8">
          {['a', 'e', 'i', 'o', 'u', 'consonants'].map((category) => (
            <button
              key={category}
              onClick={() => switchCategory(category)}
              className={`w-16 h-16 rounded-full text-lg font-bold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110'
                  : 'bg-white text-purple-600 hover:bg-purple-50 shadow-sm border border-gray-100'
              }`}
            >
              {category === 'consonants' ? (
                <span className="text-xs">B-D-M...</span>
              ) : (
                category.toUpperCase()
              )}
            </button>
          ))}
        </div>

        {/* Main Game Card */}
        <div className={`bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 ${
          showCelebration ? 'bg-gradient-to-br from-yellow-50 to-pink-50' : ''
        }`}>
          
          {/* Emoji Display */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {/* Sound and Hint Buttons */}
              <div className="absolute -top-4 left-0 right-0 flex justify-center gap-4">
                <button
                  onClick={speakWord}
                  className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                >
                  <Volume2 size={18} />
                </button>
                
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    if (!showHint) speakHint();
                  }}
                  className="w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                >
                  💡
                </button>
              </div>

              {/* Large Emoji */}
              <div className={`text-8xl mb-6 mt-8 transition-all duration-300 ${
                showCelebration ? 'animate-bounce scale-110' : ''
              }`}>
                {currentWord.emoji}
              </div>
            </div>

            {/* Hint Display */}
            {showHint && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <p className="text-yellow-800 font-medium">💭 {currentWord.hint}</p>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentWord.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-2xl text-xl font-semibold transition-all duration-200 ${
                  selectedAnswer === option
                    ? option === currentWord.word
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-red-500 text-white shadow-lg'
                    : selectedAnswer !== null && option === currentWord.word
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-purple-50 text-purple-700 border border-gray-200 hover:border-purple-200'
                } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span>{option}</span>
                  {selectedAnswer === option && (
                    option === currentWord.word ? 
                      <CheckCircle size={24} className="animate-pulse" /> : 
                      <XCircle size={24} className="animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="text-center mb-6">
              <div className={`text-3xl font-bold ${feedback.isCorrect ? 'text-green-600 animate-bounce' : 'text-orange-600 animate-pulse'}`}>
                {feedback.text}
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="text-center text-gray-600">
            <p className="text-sm font-medium mb-2">
              Word {currentIndex + 1} of {wordData[selectedCategory].length} • 
              {selectedCategory === 'consonants' ? ' Consonant Words' : ` Vowel: ${selectedCategory.toUpperCase()}`}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / wordData[selectedCategory].length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        {streak >= 3 && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
            🔥 {streak} Streak!
          </div>
        )}

        {score >= 100 && (
          <div className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
            🏆 Century Club!
          </div>
        )}

        {hearts <= 1 && hearts > 0 && (
          <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
            ⚠️ Last Heart!
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeLetterWords;