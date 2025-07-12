import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";
import "./Dashboard.css";

// FeatureCard that syncs with Firestore
const FeatureCard = ({ title, icon, bgColor, docId, defaultContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "dashboardContent", docId);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setContent(snapshot.data().content);
        } else {
          await setDoc(ref, { content: defaultContent });
          setContent(defaultContent);
        }
      } catch (err) {
        console.error(`Error fetching ${docId}:`, err);
      }
    };
    fetchData();
  }, [docId, defaultContent]);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "dashboardContent", docId), { content });
      setIsEditing(false);
      console.log(`✅ Saved ${docId}`);
    } catch (error) {
      console.error(`❌ Failed to save ${docId}:`, error);
    }
  };

  return (
    <div className="dashboard-card" style={{ borderTop: `4px solid ${bgColor}` }}>
      <div className="card-header" style={{
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px"
      }}>
        <h3>{icon} {title}</h3>
        <button className="edit-btn" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "💾 Save" : "✏️ Edit"}
        </button>
      </div>

      <div className="card-content">
        {isEditing ? (
          <textarea
            className="card-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        ) : (
          <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const notification = 3;
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const displayName = currentUser.displayName || currentUser.email || "U";
      setUserInitial(displayName.charAt(0).toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const banner = document.querySelector(".greeting");
      if (banner) {
        banner.style.opacity = 0.8;
        setTimeout(() => {
          banner.style.opacity = 1;
        }, 1000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo sun-logo">
            <div className="sun-ray ray1"></div>
            <div className="sun-ray ray2"></div>
            <div className="sun-ray ray3"></div>
            <div className="sun-ray ray4"></div>
            <div className="sun-face">😊</div>
          </div>
          <h2 className="title"> ASPIRE</h2>
        </div>

        <nav className="nav-menu">
          <button className="nav-btn active" onClick={() => navigate("/")}>🏠 Dashboard</button>
          <button className="nav-btn" onClick={() => navigate("/students")}>🧒 Students</button>
          <button className="nav-btn" onClick={() => navigate("/fun-learning")}>🎮 Fun Learning</button>
          <button className="nav-btn" onClick={() => navigate("/emotion")}>📈 Emotion</button>
          <button className="nav-btn" onClick={() => navigate("/rewards")}>🎁 Rewards</button>
          <button className="nav-btn" onClick={() => navigate("/parent")}>👨‍👩‍👧 Parent Dashboard</button>
        </nav>

        <button className="settings-btn">⚙️ Settings</button>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="notification-container">
            <div className="notification-bell">
              <span className="bell-icon">🔔</span>
              <span className="notification-badge">{notification}</span>
            </div>
            <div className="user-profile">
              <div className="profile-circle">{userInitial}</div>
              <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
            </div>
          </div>
        </header>

        <div className="greeting">
          <h2>Welcome, Teacher!</h2>
          <p>Today is a great day to learn and play! 🌈</p>
        </div>

        <div className="features-section">
          <FeatureCard
            title="Daily Schedule"
            icon="📅"
            bgColor="#4FC3F7"
            docId="dailySchedule"
            defaultContent={`9:00 AM - Math 🧮\n10:00 AM - Science 🔬\n11:00 AM - Story Time 📚`}
          />
          <FeatureCard
            title="Student Highlights"
            icon="🌟"
            bgColor="#AED581"
            docId="studentHighlights"
            defaultContent={`🎉 Aditi solved 10 puzzles!\n🏅 Aarav got gold star in reading!`}
          />
          <FeatureCard
            title="Upcoming Events"
            icon="📌"
            bgColor="#FF9800"
            docId="upcomingEvents"
            defaultContent={`April 25 - Art Day 🎨\nApril 27 - Puzzle Hour 🧩`}
          />
          <FeatureCard
            title="Resource Library"
            icon="📚"
            bgColor="#7046FF"
            docId="resourceLibrary"
            defaultContent={`📄 Worksheets\n📑 Lesson Plans`}
          />
          <FeatureCard
            title="Announcements"
            icon="📢"
            bgColor="#FF49B9"
            docId="announcements"
            defaultContent={`⚠️ School picnic postponed to May 3.`}
          />
          <FeatureCard
            title="To-Do List"
            icon="✅"
            bgColor="#9C27B0"
            docId="todoList"
            defaultContent={`☐ Plan tomorrow's math activity\n☐ Print worksheets`}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
