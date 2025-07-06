import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../Firebase"; // ✅ Make sure auth is exported from Firebase.js
import './PD.css';

const FeatureCard = ({ title, icon, bgColor, docId }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const ref = doc(db, "dashboardContent", docId);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setContent(snapshot.data().content);
        } else {
          setContent("No content available.");
        }
      } catch (error) {
        console.error(`Error fetching ${docId}:`, error);
      }
    };
    fetchContent();
  }, [docId]);

  return (
    <div className="parent-dashboard-card" style={{ borderTop: `4px solid ${bgColor}` }}>
      <div className="parent-card-header" style={{ backgroundColor: bgColor }}>
        <h3>{icon} {title}</h3>
      </div>
      <div className="parent-card-content">
        <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { from: "user", text: input },
        { from: "bot", text: "Thanks for your message! 😊 (AI coming soon...)" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="parent-chatbot-wrapper">
      {isOpen && (
        <div className="parent-chatbot-window">
          <div className="parent-chatbot-header">
            <span>🤖 ASPIRE Bot</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="parent-chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className={`parent-chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="parent-chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="parent-chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
    </div>
  );
};

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);
  const [progress, setProgress] = useState(null);
  const [initial, setInitial] = useState("P");
  const notification = 3;

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) {
      setInitial(user.email.charAt(0).toUpperCase());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const banner = document.querySelector(".parent-greeting");
      if (banner) {
        banner.style.opacity = 0.8;
        setTimeout(() => {
          banner.style.opacity = 1;
        }, 1000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const childName = localStorage.getItem("childName");
      if (!childName) return;

      const rewardsQuery = query(collection(db, "rewards"), where("name", "==", childName));
      const rewardSnap = await getDocs(rewardsQuery);
      setRewards(rewardSnap.docs.map(doc => doc.data()));

      const studentQuery = query(collection(db, "students"), where("name", "==", childName));
      const studentSnap = await getDocs(studentQuery);
      if (!studentSnap.empty) {
        const data = studentSnap.docs[0].data();
        setProgress(data.progress || {});
      }
    };

    fetchData();
  }, []);

  const renderProgressSection = (title, data) => (
    <div className="parent-progress-section">
      <h3>{title}</h3>
      {data && Object.entries(data).map(([key, val]) => (
        <div key={key} className="progress-item">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input type="text" value={val} readOnly />
        </div>
      ))}
    </div>
  );

  return (
    <div className="parent-dashboard-wrapper">
      <aside className="parent-sidebar">
        <div className="parent-logo-container">
          <div className="parent-logo parent-sun-logo">
            <div className="parent-sun-ray ray1"></div>
            <div className="parent-sun-ray ray2"></div>
            <div className="parent-sun-ray ray3"></div>
            <div className="parent-sun-ray ray4"></div>
            <div className="parent-sun-face">😊</div>
          </div>
          <h2 className="parent-title">ASPIRE</h2>
        </div>

        <nav className="parent-nav-menu">
          <button className="parent-nav-btn active" onClick={() => navigate("/")}>🏠 Dashboard</button>
        </nav>

        <button className="parent-settings-btn">⚙️ Settings</button>
      </aside>

      <main className="parent-main-content">
        <header className="parent-top-header">
          <div className="parent-notification-container">
            <div className="parent-notification-bell">
              <span className="parent-bell-icon">🔔</span>
              <span className="parent-notification-badge">{notification}</span>
            </div>
            <div className="parent-user-profile">
              <div className="parent-profile-circle">{initial}</div>
            </div>
          </div>
        </header>

        <div className="parent-greeting">
          <h2>Welcome, Parent!</h2>
          <p>Today is a great day to learn and play! 🌈</p>
        </div>

        <div className="parent-features-section">
          <FeatureCard title="Daily Schedule" icon="📅" bgColor="#4FC3F7" docId="dailySchedule" />
          <FeatureCard title="Student Highlights" icon="🌟" bgColor="#AED581" docId="studentHighlights" />
          <FeatureCard title="Upcoming Events" icon="📌" bgColor="#FF9800" docId="upcomingEvents" />
          <FeatureCard title="Resource Library" icon="📚" bgColor="#7046FF" docId="resourceLibrary" />
          <FeatureCard title="Announcements" icon="📢" bgColor="#FF49B9" docId="announcements" />
          <FeatureCard title="To-Do List" icon="✅" bgColor="#9C27B0" docId="todoList" />
        </div>

        <div className="parent-rewards-section">
          <h3>🎁 Your Child's Progress & Rewards</h3>

          {progress ? (
            <>
              {renderProgressSection("📚 Educational", progress.educational)}
              {renderProgressSection("📖 Subjects", progress.subjects)}
              {renderProgressSection("🏃 Physical", progress.physical)}
              {renderProgressSection("🎨 Miscellaneous", progress.miscellaneous)}
            </>
          ) : (
            <p>Loading progress...</p>
          )}

          <ul className="parent-reward-list">
            {rewards.length === 0 ? (
              <li>No rewards yet.</li>
            ) : (
              rewards.map((r, i) => (
                <li key={i}>
                  {r.task} - <strong>{r.status}</strong>
                </li>
              ))
            )}
          </ul>
        </div>

        <Chatbot />
      </main>
    </div>
  );
};

export default ParentDashboard;
