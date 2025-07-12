import React, { useState, useEffect } from 'react';
import './ImageBasedSentenceBuilder.css';

function ImageBasedSentenceBuilder() {
    const [selectedWords, setSelectedWords] = useState([]);
    const [sentence, setSentence] = useState("Select images to build a sentence.");
    const [language, setLanguage] = useState("en");
    const [activeCategory, setActiveCategory] = useState("Quick Access");
    const [isSpeaking, setIsSpeaking] = useState(false);

    const languageVoices = {
        en: "en-US",
        hi: "hi-IN",
        mr: "mr-IN"
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        setSelectedWords([]);
        setSentence("Select images to build a sentence.");
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sentenceFromURL = params.get('sentence');
        const langFromURL = params.get('lang');

        if (sentenceFromURL) {
            const words = sentenceFromURL.split(" ");
            setSelectedWords(words);
            setSentence(sentenceFromURL);
        }

        if (langFromURL && ["en", "hi", "mr"].includes(langFromURL)) {
            setLanguage(langFromURL);
        }
    }, []);

    const getShareableURL = () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const query = new URLSearchParams({
            sentence: selectedWords.join(" "),
            lang: language
        }).toString();
        return `${baseUrl}?${query}`;
    };

    const handleShareClick = () => {
        const shareURL = getShareableURL();
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareURL)}`;
        window.open(whatsappURL, '_blank');

        navigator.clipboard.writeText(shareURL)
            .then(() => alert("Shareable link copied to clipboard!"))
            .catch(() => alert("Failed to copy the link."));
    };

    const categories = {
        "Quick Access": [
            { emoji: "😊", text: { en: "yes", hi: "हाँ", mr: "हो" }, type: "response", bgColor: "#ffb3ba" },
            { emoji: "😡", text: { en: "no", hi: "नहीं", mr: "नाही" }, type: "response", bgColor: "#ffb3ba" },
            { emoji: "🛑", text: { en: "stop", hi: "रुकिए", mr: "थांबा" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "👋", text: { en: "hello", hi: "नमस्ते", mr: "नमस्कार" }, type: "greeting", bgColor: "#baffc9" },
            { emoji: "🙏", text: { en: "thank you", hi: "धन्यवाद", mr: "आभार" }, type: "greeting", bgColor: "#baffc9" },
            { emoji: "🧍", text: { en: "I", hi: "मैं", mr: "मी" }, type: "pronoun", bgColor: "#ffffba" },
            { emoji: "👈", text: { en: "you", hi: "तुम", mr: "तू" }, type: "pronoun", bgColor: "#ffffba" },
            { emoji: "🗣️", text: { en: "want", hi: "चाहता हूँ", mr: "हवे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🏃", text: { en: "go", hi: "जाना", mr: "जाणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "💧", text: { en: "water", hi: "पानी", mr: "पाणी" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🥛", text: { en: "milk", hi: "दूध", mr: "दूध" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍎", text: { en: "apple", hi: "सेब", mr: "सफरचंद" }, type: "noun", bgColor: "#e1baff" }
        ],
        "People": [
            { emoji: "👦", text: { en: "boy", hi: "लड़का", mr: "मुलगा" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👧", text: { en: "girl", hi: "लड़की", mr: "मुलगी" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👨", text: { en: "man", hi: "आदमी", mr: "पुरुष" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👩", text: { en: "woman", hi: "औरत", mr: "स्त्री" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👶", text: { en: "baby", hi: "बच्चा", mr: "बाळ" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👴", text: { en: "grandfather", hi: "दादा", mr: "आजोबा" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👵", text: { en: "grandmother", hi: "दादी", mr: "आजी" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👨‍🏫", text: { en: "teacher", hi: "शिक्षक", mr: "शिक्षक" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👩‍⚕️", text: { en: "doctor", hi: "डॉक्टर", mr: "डॉक्टर" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👮", text: { en: "police", hi: "पुलिस", mr: "पोलिस" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👨‍👩‍👧‍👦", text: { en: "family", hi: "परिवार", mr: "कुटुंब" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👫", text: { en: "friend", hi: "दोस्त", mr: "मित्र" }, type: "noun", bgColor: "#e1baff" }
        ],
        "Actions": [
            { emoji: "🚶", text: { en: "walk", hi: "चलना", mr: "चालणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🏃", text: { en: "run", hi: "दौड़ना", mr: "पळणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "💃", text: { en: "dance", hi: "नाचना", mr: "नाचणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🎨", text: { en: "draw", hi: "चित्र बनाना", mr: "चित्र काढणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "😴", text: { en: "sleep", hi: "सोना", mr: "झोपणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "😂", text: { en: "laugh", hi: "हँसना", mr: "हसणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🍽️", text: { en: "eat", hi: "खाना", mr: "खाणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🥤", text: { en: "drink", hi: "पीना", mr: "पिणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "📚", text: { en: "read", hi: "पढ़ना", mr: "वाचणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "✍️", text: { en: "write", hi: "लिखना", mr: "लिहिणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🎵", text: { en: "sing", hi: "गाना", mr: "गाणे" }, type: "verb", bgColor: "#bae1ff" },
            { emoji: "🤝", text: { en: "help", hi: "मदद करना", mr: "मदत करणे" }, type: "verb", bgColor: "#bae1ff" }
        ],
        "Objects": [
            { emoji: "🪑", text: { en: "chair", hi: "कुर्सी", mr: "खुर्ची" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🚗", text: { en: "car", hi: "गाड़ी", mr: "गाडी" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "📚", text: { en: "book", hi: "किताब", mr: "पुस्तक" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "📱", text: { en: "phone", hi: "फोन", mr: "फोन" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🏠", text: { en: "house", hi: "घर", mr: "घर" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🚌", text: { en: "bus", hi: "बस", mr: "बस" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🚲", text: { en: "bicycle", hi: "साइकिल", mr: "सायकल" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "⚽", text: { en: "ball", hi: "गेंद", mr: "चेंडू" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🎒", text: { en: "bag", hi: "बैग", mr: "बॅग" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👕", text: { en: "shirt", hi: "शर्ट", mr: "शर्ट" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "👟", text: { en: "shoes", hi: "जूते", mr: "चप्पल" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🧸", text: { en: "toy", hi: "खिलौना", mr: "खेळणी" }, type: "noun", bgColor: "#e1baff" }
        ],
        "Food": [
            { emoji: "🍞", text: { en: "bread", hi: "रोटी", mr: "पोळी" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍎", text: { en: "apple", hi: "सेब", mr: "सफरचंद" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍌", text: { en: "banana", hi: "केला", mr: "केळे" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍚", text: { en: "rice", hi: "चावल", mr: "भात" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍕", text: { en: "pizza", hi: "पिज्जा", mr: "पिझ्झा" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍔", text: { en: "burger", hi: "बर्गर", mr: "बर्गर" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍰", text: { en: "cake", hi: "केक", mr: "केक" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍪", text: { en: "cookie", hi: "बिस्कुट", mr: "बिस्कीट" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🥤", text: { en: "juice", hi: "जूस", mr: "रस" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "☕", text: { en: "coffee", hi: "कॉफी", mr: "कॉफी" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🍯", text: { en: "honey", hi: "शहद", mr: "मध" }, type: "noun", bgColor: "#e1baff" },
            { emoji: "🧀", text: { en: "cheese", hi: "पनीर", mr: "पनीर" }, type: "noun", bgColor: "#e1baff" }
        ]
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = languageVoices[language] || "en-US";
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    const handleCardClick = (textObj) => {
        const word = textObj[language];
        speak(word);
        setSelectedWords(prev => [...prev, word]);
        const newSentence = [...selectedWords, word].join(" ");
        setSentence(newSentence);
    };

    const clearSentence = () => {
        setSelectedWords([]);
        setSentence("Select images to build a sentence.");
    };

    const speakSentence = () => {
        if (sentence !== "Select images to build a sentence.") {
            speak(sentence);
        }
    };

    const deleteLastWord = () => {
        if (selectedWords.length > 0) {
            const newSelectedWords = selectedWords.slice(0, -1);
            setSelectedWords(newSelectedWords);
            if (newSelectedWords.length === 0) {
                setSentence("Select images to build a sentence.");
            } else {
                setSentence(newSelectedWords.join(" "));
            }
        }
    };

    const removeWord = (index) => {
        const newSelectedWords = selectedWords.filter((_, i) => i !== index);
        setSelectedWords(newSelectedWords);
        if (newSelectedWords.length === 0) {
            setSentence("Select images to build a sentence.");
        } else {
            setSentence(newSelectedWords.join(" "));
        }
    };

    return (
        <div className="aac-app">
            {/* Header */}
            <div className="app-container">
                <div className="header">
                    <h1 className="main-title">
                        🗣️ Sentence Builder
                    </h1>
                    <p className="subtitle">
                        Build sentences by selecting images and words
                    </p>
                </div>

                {/* Language Selector */}
                <div className="language-selector">
                    <div className="language-selector-content">
                        <label htmlFor="language" className="language-label">
                            🌍 Language:
                        </label>
                        <select 
                            id="language" 
                            value={language} 
                            onChange={handleLanguageChange}
                            className="language-select"
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi (हिंदी)</option>
                            <option value="mr">Marathi (मराठी)</option>
                        </select>
                    </div>
                </div>

                {/* Sentence Display */}
                <div className="sentence-section">
                    <div className="sentence-header">
                        <h2 className="sentence-title">Your Sentence:</h2>
                        <div className="control-buttons">
                            <button 
                                onClick={speakSentence}
                                disabled={isSpeaking || sentence === "Select images to build a sentence."}
                                className="control-btn speak-btn"
                            >
                                {isSpeaking ? '🔊' : '🔊'} Speak
                            </button>
                            <button 
                                onClick={deleteLastWord}
                                disabled={selectedWords.length === 0}
                                className="control-btn delete-btn"
                            >
                                ⬅️ Delete Last
                            </button>
                            <button 
                                onClick={clearSentence}
                                disabled={selectedWords.length === 0}
                                className="control-btn clear-btn"
                            >
                                🗑️ Clear
                            </button>
                            <button 
                                onClick={handleShareClick}
                                disabled={selectedWords.length === 0}
                                className="control-btn share-btn"
                            >
                                📤 Share
                            </button>
                        </div>
                    </div>
                    
                    <div className="sentence-display">
                        {selectedWords.length > 0 ? (
                            <div className="word-chips">
                                {selectedWords.map((word, index) => (
                                    <span 
                                        key={index}
                                        className="word-chip"
                                        onClick={() => removeWord(index)}
                                        title="Click to remove this word"
                                    >
                                        {word}
                                        <button className="remove-word-btn">
                                            ❌
                                        </button>
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-sentence">
                                {sentence}
                            </div>
                        )}
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="category-nav">
                    <div className="category-buttons">
                        {Object.keys(categories).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Word Cards */}
                <div className="cards-section">
                    <h2 className="category-title">
                        {activeCategory}
                    </h2>
                    <div className="card-grid">
                        {categories[activeCategory].map((item, idx) => (
                            <div 
                                key={idx} 
                                className="card"
                                style={{ backgroundColor: item.bgColor }}
                                onClick={() => handleCardClick(item.text)}
                            >
                                <div className="card-content">
                                    <div className="card-emoji">{item.emoji}</div>
                                    <div className="card-text">
                                        {item.text[language]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageBasedSentenceBuilder;