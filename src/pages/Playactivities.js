import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Playactivities.css';

function Playactivities() {
  const navigate = useNavigate();

  const activities = [
    {
      title: "Physical Exercises",
      icon: "🏃‍♂️",
      description: "Simple guided movements to enhance motor coordination",
      route: "/physical-exercises"
    },
    {
      title: "Breathing Exercises",
      icon: "🧘‍♀️",
      description: "Gentle breathing techniques to promote calmness"
      // route can be added later
    },
    {
      title: "Dance & Movement",
      icon: "💃",
      description: "Fun dance routines to improve rhythm and focus"
    },
    {
      title: "Interactive Games",
      icon: "🕹️",
      description: "Engaging games to support cognitive development"
    }
  ];

  const handleBackClick = () => {
    navigate('/fun-learning');
  };

  const handleCardClick = (activity) => {
    if (activity.route) {
      navigate(activity.route);
    } else {
      alert(`${activity.title} feature is coming soon!`);
    }
  };

  return (
    <div className="play-activities-container">
      <div className="header-banner">
        <button className="back-button" onClick={handleBackClick}>
          <span className="back-arrow">←</span> Back
        </button>
        <h1>Play Activities</h1>
        <p>Engaging activities designed to enhance physical and mental wellness in children</p>
      </div>

      <div className="play-cards-container">
        {activities.map((activity, index) => (
          <div
            className="play-card"
            key={index}
            onClick={() => handleCardClick(activity)}
            style={{ cursor: activity.route ? 'pointer' : 'default' }}
          >
            <div className="card-icon">{activity.icon}</div>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playactivities;
