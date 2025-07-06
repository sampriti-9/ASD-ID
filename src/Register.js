import React, { useState } from 'react';
import { auth, db } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = ({ close }) => {
  const [role, setRole] = useState('parent');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userData = {
        role,
        email,
        ...(role === 'parent' && { childName })
      };

      await setDoc(doc(db, 'users', uid), userData);

      if (role === 'parent') {
        localStorage.setItem('childName', childName); // store for parent view
        navigate('/parent');
      } else {
        navigate('/dashboard');
      }
      close();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <label>
        Register as:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <input
        type="email"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {role === 'parent' && (
        <input
          type="text"
          placeholder="Child's Name"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          required
        />
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>
      <button type="button" onClick={close}>Close</button>
    </form>
  );
};

export default Register;
