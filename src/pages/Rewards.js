// StudentProgressTracker.jsx

import React, { useEffect, useState } from 'react';
import { User, Save } from 'lucide-react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // make sure this is correctly set
import './Rewards.css';

const defaultProgress = {
  educational: { communication: 0, learning: 0, listening: 0 },
  subjects: { science: 0, hindi: 0, english: 0, maths: 0 },
  physical: { mindActivities: 0, yoga: 0, dance: 0 },
  miscellaneous: { singing: 0, craft: 0, drawing: 0 }
};

const ActivitySection = ({ title, activities, onChange }) => (
  <div className="activity-section">
    <h4>{title}</h4>
    <div className="activity-list">
      {Object.entries(activities).map(([activity, rating]) => (
        <div key={activity} className="activity-row">
          <span className="activity-name">{activity.charAt(0).toUpperCase() + activity.slice(1)}</span>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => onChange(activity, Number(e.target.value))}
            className="rating-input"
          />
        </div>
      ))}
    </div>
  </div>
);

const StudentCard = ({ student, onSave }) => {
  const [editableProgress, setEditableProgress] = useState(student.progress || defaultProgress);

  const handleChange = (category, activity, value) => {
    setEditableProgress(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [activity]: value
      }
    }));
  };

  const saveProgress = async () => {
    await onSave(student.id, editableProgress);
  };

  return (
    <div className="student-card">
      <div className="student-header">
        <div className="student-avatar">
          <User className="icon" />
        </div>
        <h3>{student.name}</h3>
        <button className="save-btn" onClick={saveProgress}>
          <Save size={18} /> Save
        </button>
      </div>

      <div className="student-progress">
        <ActivitySection
          title="📚 Educational"
          activities={editableProgress.educational}
          onChange={(act, val) => handleChange('educational', act, val)}
        />
        <ActivitySection
          title="📖 Subjects"
          activities={editableProgress.subjects}
          onChange={(act, val) => handleChange('subjects', act, val)}
        />
        <ActivitySection
          title="🏃 Physical"
          activities={editableProgress.physical}
          onChange={(act, val) => handleChange('physical', act, val)}
        />
        <ActivitySection
          title="🎨 Miscellaneous"
          activities={editableProgress.miscellaneous}
          onChange={(act, val) => handleChange('miscellaneous', act, val)}
        />
      </div>
    </div>
  );
};

const StudentProgressTracker = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students')); // collection name is 'students'
      const studentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        progress: doc.data().progress || defaultProgress
      }));
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  const handleSave = async (studentId, updatedProgress) => {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, { progress: updatedProgress });
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, progress: updatedProgress } : student
      )
    );
    alert('Progress updated!');
  };

  return (
    <div className="rewards-container">
      <header className="rewards-header">
        <h1>🎁 Student Rewards</h1>
        <p>Manually update student progress and reward scores</p>
      </header>

      <div className="student-grid">
        {students.length > 0 ? (
          students.map(student => (
            <StudentCard key={student.id} student={student} onSave={handleSave} />
          ))
        ) : (
          <p className="no-students">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentProgressTracker;
