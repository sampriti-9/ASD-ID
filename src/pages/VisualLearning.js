import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './VisualLearning.css';

const VisualLearning = () => {
  const cardsContainerRef = useRef(null);
  const navigate = useNavigate();

  const Card = ({ title, description, buttonText, onClick }) => {
    return (
      <div className="visual-card" onClick={onClick}>
        <div className="pin"></div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button>{buttonText}</button>
      </div>
    );
  };

  useEffect(() => {
    const applyCardEffects = () => {
      if (!cardsContainerRef.current) return;

      const cards = cardsContainerRef.current.querySelectorAll('.visual-card');

      cards.forEach((card) => {
        const randomRotateX = (Math.random() * 6) - 3;
        const randomRotateY = (Math.random() * 6) - 3;
        card.style.transform = `rotateX(${randomRotateX}deg) rotateY(${randomRotateY}deg)`;

        const animationDuration = 3 + Math.random() * 2;
        card.style.animation = `float ${animationDuration}s ease-in-out infinite`;
      });
    };

    applyCardEffects();
  }, []);

  return (
    <div className="visual-learning-container">
      {/* Header Section */}
      <div className="visual-learning-header">
        <h1>Visual Learning Activities</h1>
        <p>
          Engage in fun, visual-based learning modules to build memory,
          recognition, and communication skills.
        </p>
      </div>

      {/* Cards Section */}
      <div className="visual-learning-cards" ref={cardsContainerRef}>
        <Card 
          title="Image-based Sentence Builder"
          description="Select a set of images to create meaningful sentences and practice communication."
          buttonText="Start Building Sentences"
          onClick={() => navigate('/SentenceBuilder')}
        />
        
        <Card 
          title="Visual Sequencing Game"
          description="Arrange images in the correct sequence to tell a story and improve logical thinking."
          buttonText="Start Sequencing"
          onClick={() => navigate('/VisualSequencingGame')} // ✅ Corrected path
        />
      </div>
    </div>
  );
};

export default VisualLearning;
