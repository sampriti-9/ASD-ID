import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EducationalLearning.css';

const subjects = [
  { name: 'English', icon: '📖', color: 'pink' },
  { name: 'Maths', icon: '🔢', color: 'blue' },
  { name: 'Science', icon: '⚗️', color: 'green' },
  { name: 'Hindi', icon: '✍️', color: 'orange' }
];

const EducationalLearning = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  const renderSubjectContent = () => {
    switch (selectedSubject) {
      case 'Maths':
        return <MathContent navigate={navigate} />;
      case 'English':
        return <EnglishContent navigate={navigate} />;
      case 'Science':
        return <ComingSoon subject="Science" />;
      case 'Hindi':
        return <ComingSoon subject="Hindi" />;
      default:
        return null;
    }
  };

  return (
    <div className="edu-container">
      <div className="header-card">
        <h2>Choose a Subject</h2>
      </div>

      <div className="subject-cards">
        {subjects.map(subject => (
          <div
            key={subject.name}
            className={`subject-card ${subject.color} ${selectedSubject === subject.name ? 'selected' : ''}`}
            onClick={() => setSelectedSubject(subject.name)}
          >
            <div className="card-icon">
              <span className="emoji-icon">{subject.icon}</span>
            </div>
            <h3>{subject.name}</h3>
          </div>
        ))}
      </div>

      <div className="subject-content">{renderSubjectContent()}</div>
    </div>
  );
};

const MathContent = ({ navigate }) => (
  <div className="subject-details">
    <h3>Math Topics</h3>
    <ul>
      <li>
        <button className="link-button" onClick={() => navigate('/math-topics')}>
          Explore Age-wise Math Topics
        </button>
      </li>
    </ul>
  </div>
);

const EnglishContent = ({ navigate }) => (
  <div className="subject-details">
    <h3>English Topics</h3>
    <ul>
      <li>
        <button className="link-button" onClick={() => navigate('/english/alphabet-video')}>
          Alphabets
        </button>
      </li>
      <li>
        <a href="/videos/phonics.mp4" target="_blank" rel="noopener noreferrer">
          Phonics
        </a>
      </li>
      <li>
        <button className="link-button" onClick={() => navigate('/english/three-letter-words')}>
          3-letter Words Game
        </button>
      </li>
    </ul>
  </div>
);

const ComingSoon = ({ subject }) => (
  <p className="coming-soon">{subject} content coming soon!</p>
);

export default EducationalLearning;
