import React, { useRef, useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import legExercise from '../animations/leg.json';
import generalExercise from '../animations/exercise.json';
import './PhysicalExercises.css';

const PhysicalExercises = () => {
  const generalRef = useRef(null);
  const legRef = useRef(null);
  
  const [currentExercise, setCurrentExercise] = useState('general');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Exercise data
  const exercises = {
    general: {
      title: 'General Exercise',
      ref: generalRef,
      animation: generalExercise,
      description: 'Full body workout that helps improve overall fitness, flexibility, and strength. Great for daily energy boost and maintaining good health.',
      benefits: ['Improves cardiovascular health', 'Builds overall strength', 'Enhances flexibility', 'Boosts energy levels']
    },
    leg: {
      title: 'Leg Exercise',
      ref: legRef,
      animation: legExercise,
      description: 'Focused leg workout to strengthen lower body muscles, improve balance, and enhance leg mobility. Perfect for building strong foundation.',
      benefits: ['Strengthens leg muscles', 'Improves balance', 'Enhances mobility', 'Builds core stability']
    }
  };

  // Exercise suggestions
  const exerciseSuggestions = [
    "Try 10 minutes of morning stretching",
    "Do 15 jumping jacks",
    "Practice deep breathing exercises",
    "Take a 5-minute walk",
    "Try simple yoga poses",
    "Do wall push-ups",
    "Practice balance exercises",
    "Try seated exercises",
    "Do neck and shoulder rolls",
    "Practice mindful movement"
  ];

  // Mock progress tracking
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev + 1) % 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    const currentRef = exercises[currentExercise].ref;
    if (isPlaying) {
      currentRef.current?.pause();
    } else {
      currentRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetExercise = () => {
    const currentRef = exercises[currentExercise].ref;
    currentRef.current?.stop();
    setProgress(0);
    setIsPlaying(false);
  };

  const switchExercise = (exerciseType) => {
    // Pause current exercise
    const currentRef = exercises[currentExercise].ref;
    currentRef.current?.pause();
    
    // Switch to new exercise
    setCurrentExercise(exerciseType);
    setProgress(0);
    setIsPlaying(true);
    
    // Play new exercise after a short delay
    setTimeout(() => {
      const newRef = exercises[exerciseType].ref;
      newRef.current?.play();
    }, 100);
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="exercise-main-container">
      <div className="exercise-container">
        <h1>🧒 Physical Exercises</h1>
        
        {/* Exercise Selector */}
        <div className="exercise-selector">
          <button 
            className={`selector-button ${currentExercise === 'general' ? 'active' : ''}`}
            onClick={() => switchExercise('general')}
          >
            🏃‍♂️ General Exercise
          </button>
          <button 
            className={`selector-button ${currentExercise === 'leg' ? 'active' : ''}`}
            onClick={() => switchExercise('leg')}
          >
            🦵 Leg Exercise
          </button>
        </div>

        {/* Main Exercise Display */}
        <div className="exercise-showcase">
          <div className="current-exercise">
            <h2 className={`exercise-title ${currentExercise}`}>
              {currentExerciseData.title}
            </h2>
            
            <div className="exercise-player-container">
              {/* General Exercise Player */}
              <div style={{ display: currentExercise === 'general' ? 'block' : 'none' }}>
                <Player
                  ref={generalRef}
                  autoplay={currentExercise === 'general'}
                  loop
                  src={generalExercise}
                  className="exercise-player"
                />
              </div>
              
              {/* Leg Exercise Player */}
              <div style={{ display: currentExercise === 'leg' ? 'block' : 'none' }}>
                <Player
                  ref={legRef}
                  autoplay={currentExercise === 'leg'}
                  loop
                  src={legExercise}
                  className="exercise-player"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="exercise-controls">
              <button className="control-button" onClick={togglePlayPause}>
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button className="control-button" onClick={resetExercise}>
                🔄 Reset
              </button>
            </div>

            {/* Status */}
            <div className="status-display">
              <span className={`status-indicator ${isPlaying ? 'playing' : 'paused'}`}></span>
              {isPlaying ? 'Exercise in Progress' : 'Exercise Paused'}
            </div>

            {/* Exercise Description */}
            <div className="exercise-description">
              <p>{currentExerciseData.description}</p>
              <h4>Benefits:</h4>
              <ul style={{ textAlign: 'left', margin: '10px 0' }}>
                {currentExerciseData.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Exercise Suggestions */}
        <div className="suggestions-section">
          <h3 className="suggestions-title">💡 More Exercise Ideas</h3>
          <div className="suggestions-grid">
            {exerciseSuggestions.map((suggestion, index) => (
              <button key={index} className="suggestion-pill">
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalExercises;