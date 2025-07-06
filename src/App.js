import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Students from './pages/Students';
import FunLearning from './pages/FunLearning';
import Emotion from './pages/Emotion';
import ParentZone from './pages/ParentZone';
import VoiceTextLearning from './pages/VoiceTextLearning';
import VisualLearning from './pages/VisualLearning';
import ImageBasedSentenceBuilder from './pages/ImageBasedSentenceBuilder';
import VisualSequencingGame from './pages/VisualSequencingGame';
import AudioBooks from './pages/AudioBooks';
import Playactivities from './pages/Playactivities';
import PhysicalExercises from './pages/PhysicalExercises';
import StudentProgressTracker from './pages/Rewards';
import ParentDashboard from './parent/PD';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import EducationalLearning from './pages/EducationalLearning';
import MathTopics from './pages/MathTopics';
import OperationsGame from './pages/OperationsGame';
import AlphabetVideoPage from './pages/AlphabetVideoPage'
import ThreeLetterWords from './pages/ThreeLetterWords';
import './Firebase'; // Firebase initialization

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/fun-learning" element={<FunLearning />} />
        <Route path="/voice-text-learning" element={<VoiceTextLearning />} />
        <Route path="/emotion" element={<Emotion />} />
        <Route path="/parent-zone" element={<ParentZone />} />
        <Route path="/visual-learning" element={<VisualLearning />} />
        <Route path="/SentenceBuilder" element={<ImageBasedSentenceBuilder />} />
        <Route path="/visual-sequencing" element={<VisualSequencingGame />} />
        <Route path="/audio-books" element={<AudioBooks />} />
        <Route path="/play-activities" element={<Playactivities />} />
        <Route path="/physical-exercises" element={<PhysicalExercises />} />
        <Route path="/rewards" element={<StudentProgressTracker />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/math-topics" element={<MathTopics />} />
        <Route path="/operations-game" element={<OperationsGame />} />
<Route path="/three-letter-words" element={<ThreeLetterWords />} /> 
        <Route path="/educational-learning" element={<EducationalLearning />} /> {/* ✅ Fixed route here */}
        <Route path="/english/alphabet-video" element={<AlphabetVideoPage />} />

      </Routes>
    </Router>
  );
}

export default App;
