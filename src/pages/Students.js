import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Students.css';
import { db } from '../Firebase'; // ✅ Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';



const studentsRef = collection(db, 'students');

const defaultStudents = [
  { id: 1, name: 'Arjun', age: 7, focus: 'ABC Focus', rating: 3 },
  { id: 2, name: 'Meera', age: 6, focus: '123 Focus', rating: 4 },
  { id: 3, name: 'Rahul', age: 8, focus: 'Social Focus', rating: 2 },
];

export default function Student() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : defaultStudents;
  });

  const [form, setForm] = useState({ name: '', age: '', focus: '', rating: 0 });
  const [filter, setFilter] = useState('All');
  const [sortKey, setSortKey] = useState(null);

 useEffect(() => {
  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(studentsRef);
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsData);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  fetchStudents();
}, []);


  const handleAdd = async () => {
    const newStudent = {
      name: form.name,
      age: parseInt(form.age),
      focus: form.focus,
      rating: parseInt(form.rating),
    };

    try {
      await addDoc(studentsRef, newStudent);
      console.log("✅ Student saved to Firestore!");

      setStudents(prev => [...prev, { ...newStudent, id: Date.now() }]);
      setForm({ name: '', age: '', focus: '', rating: 0 });
    } catch (error) {
      console.error("❌ Error saving to Firestore:", error);
    }
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleSort = (key) => {
    setSortKey(key);
  };

  const filteredStudents = students
    .filter(s => filter === 'All' || s.focus === filter)
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === 'age') return a.age - b.age;
      if (sortKey === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="student-container">
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        My Amazing Students 🌟
      </motion.h1>

      <motion.div
        className="controls"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
        />
        <input
          placeholder="Focus Area"
          value={form.focus}
          onChange={e => setForm({ ...form, focus: e.target.value })}
        />
        <input
          placeholder="Rating (1-5)"
          type="number"
          max="5"
          min="1"
          value={form.rating}
          onChange={e => setForm({ ...form, rating: e.target.value })}
        />
        <button onClick={handleAdd}>➕ Add Student</button>
      </motion.div>

      <motion.div
        className="filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button onClick={() => setFilter('All')}>All</button>
        {[...new Set(students.map(s => s.focus))].map(f => (
          <button key={f} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <button onClick={() => handleSort('age')}>Sort by Age</button>
        <button onClick={() => handleSort('rating')}>Sort by Rating</button>
      </motion.div>

      <div className="card-grid">
        <AnimatePresence>
          {filteredStudents.map(s => (
            <motion.div
              key={s.id}
              className="student-card"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="avatar">{s.name.charAt(0)}</div>
              <div className="details">
                <h3>{s.name}</h3>
                <p>{s.age} years</p>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < s.rating ? '⭐' : '☆'}</span>
                  ))}
                </div>
                <p className="focus">🎯 {s.focus}</p>
                <button className="delete" onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
