import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FunLearning.css';

function FunLearning() {
  // Activity cards data
  const activities = [
    {
      title: "Visual Learning",
      icon: "👁️",
      description: "Interactive visual materials that help with pattern recognition and memory",
      path: "/visual-learning"
    },
    {
      title: "Educational Learning",
      icon: "🎬",
      description: "Calming videos that teach concepts in a gentle, structured way",
      path: "/educational-learning"
    },
    {
      title: "Audio Book",
      icon: "🔊",
      description: "Listen to stories and educational content with visual aids",
      path: "/audio-books"
    },
    {
      title: "Play Activities",
      icon: "🎮",
      description: "Fun interactive games that reinforce learning concepts",
      path: "/play-activities"
    },
    {
      title: "Voice to Text Learning",
      icon: "🗣️",
      description: "Practice speaking and see words appear on screen",
      path: "/voice-text-learning"
    }
  ];

  // For card hover effects
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="fun-learning-container">
      <div className="header-banner">
        <h1>Fun Learning Activities</h1>
        <p>Engaging, visual-based learning modules designed specifically for children with autism aged 5–12.</p>
      </div>

      <div className="cards-container">
        {activities.map((activity, index) => (
          <div 
            className={`activity-card ${hoveredCard === index ? 'card-hover' : ''}`}
            key={index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(activity.path)}
          >
            <div className="card-icon">{activity.icon}</div>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>

      <div className="info-footer">
        <div className="info-box">
          <h3>⏱️ Screen Time Optimized</h3>
          <p>Short, effective learning bursts with supervision</p>
        </div>
        <div className="info-box">
          <h3>📅 Weekly Schedule</h3>
          <p>Structured activities with consistent timing</p>
        </div>
      </div>
    </div>
  );
}

export default FunLearning;