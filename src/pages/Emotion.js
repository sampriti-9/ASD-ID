import React, { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import "./Emotion.css";

const Emotion = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null); // You missed this declaration before

  const [name, setName] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [capturedEmotion, setCapturedEmotion] = useState("");
  const [studentRecords, setStudentRecords] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 720, height: 560 });

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const loadModels = useCallback(async () => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector`),
        faceapi.nets.faceExpressionNet.loadFromUri(`${MODEL_URL}/face_expression`)
      ]);
      await startVideo();
    } catch (err) {
      console.error("Error loading models: ", err);
    }
  }, []);

  useEffect(() => {
    if (showCamera) {
      loadModels();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera, loadModels]);

  const handleVideoMetadataLoaded = () => {
    if (videoRef.current) {
      setDimensions({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      });
      handleVideoOnPlay(); // Start detection only after video dimensions are available
    }
  };

  const handleVideoOnPlay = () => {
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      if (videoRef.current.readyState !== 4) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      const canvas = canvasRef.current;
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      };

      // Match canvas to video dimensions
      if (canvas.width !== displaySize.width || canvas.height !== displaySize.height) {
        faceapi.matchDimensions(canvas, displaySize);
      }

      const resized = faceapi.resizeResults(detections, displaySize);

      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
        if (sorted.length > 0) {
          setCapturedEmotion(sorted[0][0]);
        }
      }
    }, 500);
  };

  const handleStart = () => {
    if (name.trim() === "") {
      alert("Please enter your name first!");
      return;
    }
    setShowCamera(true);
  };

  const handleStop = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (name && capturedEmotion) {
      setStudentRecords(prev => [...prev, { name, emotion: capturedEmotion }]);
    }

    setName("");
    setCapturedEmotion("");
    setShowCamera(false);
  };

  return (
    <div className="progress-page">
      <h1>Student Progress - Face Recognition</h1>

      {!showCamera && (
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />
          <button onClick={handleStart} className="start-button">
            Start Camera
          </button>
        </div>
      )}

      {showCamera && (
        <div className="camera-section">
          <div style={{ position: "relative", width: dimensions.width, height: dimensions.height }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={handleVideoMetadataLoaded}
              style={{ width: "100%", height: "100%" }}
            />
            <canvas
              ref={canvasRef}
              className="overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            />
          </div>
          <button onClick={handleStop} className="stop-button">
            Stop Camera
          </button>
        </div>
      )}

      {studentRecords.length > 0 && (
        <div className="results-section">
          <h2>Student Records</h2>
          <table className="students-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Student Name</th>
                <th>Detected Emotion</th>
              </tr>
            </thead>
            <tbody>
              {studentRecords.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.emotion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Emotion;
