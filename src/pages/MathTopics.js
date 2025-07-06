import React, { useState } from 'react';
import TablesComponent from './TablesComponent';
import OperationsGame from './OperationsGame';
import './MathTopics.css';

const MathTopics = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('5-10');
  const [selectedContent5to10, setSelectedContent5to10] = useState(null);

  const renderContent = () => {
    switch (selectedAgeGroup) {
      case '1-5':
        return (
          <div className="card-grid center-cards">
            <div className="content-card pastel-blue">
              <div className="card-icon">🔢</div>
              <div className="card-header">Counting Adventure</div>
              <p className="card-description">Embark on a magical journey to learn numbers and counting with fun animations!</p>
              <div className="card-tags">
                <span className="tag">✨ Numbers</span>
                <span className="duration">⏱ 2:00</span>
              </div>
              <a href="/videos/counting.mp4" target="_blank" rel="noopener noreferrer">
                <button className="play-button">
                  <span className="button-icon">▶</span>
                  <span>Start Learning</span>
                </button>
              </a>
            </div>
            <div className="content-card pastel-purple">
              <div className="card-icon">🔷</div>
              <div className="card-header">Shape Explorer</div>
              <p className="card-description">Discover amazing shapes in our colorful world with interactive visuals!</p>
              <div className="card-tags">
                <span className="tag">🎨 Shapes</span>
                <span className="duration">⏱ 2:45</span>
              </div>
              <a href="/videos/shapes.mp4" target="_blank" rel="noopener noreferrer">
                <button className="play-button">
                  <span className="button-icon">▶</span>
                  <span>Explore Now</span>
                </button>
              </a>
            </div>
          </div>
        );

      case '5-10':
        return (
          <>
            <div className="card-grid center-cards">
              <div className="content-card pastel-peach clickable" onClick={() => setSelectedContent5to10('tables')}>
                <div className="card-icon">📚</div>
                <div className="card-header">Multiplication Magic</div>
                <p className="card-description">Unlock the secrets of multiplication with our complete table collection (1-30)!</p>
                <div className="card-tags">
                  <span className="tag">🧮 Tables</span>
                  <span className="difficulty">⭐ Easy</span>
                </div>
                <button className="play-button interactive-button">
                  <span className="button-icon">🚀</span>
                  <span>Open Tables</span>
                </button>
              </div>
              <div className="content-card pastel-mint clickable" onClick={() => setSelectedContent5to10('operations')}>
                <div className="card-icon">🎮</div>
                <div className="card-header">Math Operations Quest</div>
                <p className="card-description">Challenge yourself with exciting addition and subtraction adventures!</p>
                <div className="card-tags">
                  <span className="tag">➕ Operations</span>
                  <span className="difficulty">⭐⭐ Medium</span>
                </div>
                <button className="play-button interactive-button">
                  <span className="button-icon">🎯</span>
                  <span>Start Game</span>
                </button>
              </div>
            </div>

            <div className="content-section">
              {selectedContent5to10 === 'tables' && (
                <div className="content-card pastel-peach table-section animated-card full-screen-section">
                  <div className="section-header">
                    <div className="card-icon large">🧮</div>
                    <div className="card-header">Multiplication Tables Hub</div>
                    <p className="section-subtitle">Complete collection of multiplication tables from 1 to 30</p>
                  </div>
                  <TablesComponent />
                </div>
              )}
              {selectedContent5to10 === 'operations' && (
                <div className="content-card pastel-mint animated-card full-screen-section">
                  <div className="section-header">
                    <div className="card-icon large">🎮</div>
                    <div className="card-header">Math Operations Playground</div>
                    <p className="section-subtitle">Interactive games for addition and subtraction practice</p>
                  </div>
                  <OperationsGame />
                </div>
              )}
            </div>
          </>
        );

      case '10-15':
        return (
          <div className="card-grid center-cards">
            <div className="content-card pastel-yellow">
              <div className="card-icon">🧩</div>
              <div className="card-header">Fraction Mastery</div>
              <p className="card-description">Master the art of fractions with stunning visual representations and solved examples!</p>
              <div className="card-tags">
                <span className="tag">🎯 Advanced</span>
                <span className="duration">⏱ 6:00</span>
              </div>
              <a href="/videos/fractions.mp4" target="_blank" rel="noopener noreferrer">
                <button className="play-button">
                  <span className="button-icon">▶</span>
                  <span>Master Fractions</span>
                </button>
              </a>
            </div>
            <div className="content-card pastel-lavender">
              <div className="card-icon">📐</div>
              <div className="card-header">Algebra Foundations</div>
              <p className="card-description">Build strong foundations in algebra with step-by-step guided learning!</p>
              <div className="card-tags">
                <span className="tag">🔬 Algebra</span>
                <span className="duration">⏱ 7:30</span>
              </div>
              <a href="/videos/algebra.mp4" target="_blank" rel="noopener noreferrer">
                <button className="play-button">
                  <span className="button-icon">▶</span>
                  <span>Start Algebra</span>
                </button>
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="math-container">
      <div className="heading-box">
        <div className="main-icon">🧠</div>
        <h2 className="math-heading">Fun with Mathematics</h2>
        <p className="math-subtitle">Discover the joy of learning math through interactive experiences!</p>
      </div>

      <div className="age-tabs">
        {[
          { age: '1-5', label: 'Little Learners', icon: '🧸' },
          { age: '5-10', label: 'Young Explorers', icon: '🌟' },
          { age: '10-15', label: 'Math Masters', icon: '🏆' }
        ].map(({ age, label, icon }) => (
          <button
            key={age}
            className={`age-tab ${selectedAgeGroup === age ? 'active' : ''}`}
            onClick={() => {
              setSelectedAgeGroup(age);
              setSelectedContent5to10(null);
            }}
          >
            <span className="tab-icon">{icon}</span>
            <div className="tab-content">
              <div className="tab-age">Ages {age}</div>
              <div className="tab-label">{label}</div>
            </div>
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default MathTopics;