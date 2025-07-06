import React, { useState, useEffect } from 'react';
import './ImageBasedSentenceBuilder.css';

function ImageBasedSentenceBuilder() {
    const [selectedWords, setSelectedWords] = useState([]);
    const [sentence, setSentence] = useState("Select images to build a sentence.");
    const [language, setLanguage] = useState("en");

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

    const categories = [
        {
            name: "Quick Access",
            items: [
                { emoji: "😊", text: { en: "yes", hi: "हाँ", mr: "हो" }, type: "response", bgColor: "pink" },
                { emoji: "😡", text: { en: "no", hi: "नहीं", mr: "नाही" }, type: "response", bgColor: "pink" },
                { emoji: "🛑", text: { en: "stop", hi: "रुकिए", mr: "थांबा" }, type: "verb", bgColor: "lightgreen" },
                { emoji: "👋", text: { en: "hello", hi: "नमस्ते", mr: "नमस्कार" }, type: "greeting", bgColor: "lightgreen" },
                { emoji: "🙏", text: { en: "thank you", hi: "धन्यवाद", mr: "आभार" }, type: "greeting", bgColor: "lightgreen" },
                { emoji: "🍎", text: { en: "apple", hi: "सेब", mr: "सफरचंद" }, type: "noun", bgColor: "lightblue" },
                { emoji: "🍞", text: { en: "bread", hi: "रोटी", mr: "पोळी" }, type: "noun", bgColor: "lightblue" },
                { emoji: "💧", text: { en: "water", hi: "पानी", mr: "पाणी" }, type: "noun", bgColor: "lightblue" },
                { emoji: "🥛", text: { en: "milk", hi: "दूध", mr: "दूध" }, type: "noun", bgColor: "lightblue" },
                { emoji: "🚶", text: { en: "walk", hi: "चलना", mr: "चालणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "🏃", text: { en: "run", hi: "दौड़ना", mr: "पळणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "🪑", text: { en: "chair", hi: "कुर्सी", mr: "खुर्ची" }, type: "noun", bgColor: "lightblue" },
                { emoji: "🚗", text: { en: "car", hi: "गाड़ी", mr: "गाडी" }, type: "noun", bgColor: "lightblue" },
                { emoji: "📚", text: { en: "book", hi: "किताब", mr: "पुस्तक" }, type: "noun", bgColor: "lightblue" },
                { emoji: "👦", text: { en: "boy", hi: "लड़का", mr: "मुलगा" }, type: "noun", bgColor: "lightblue" },
                { emoji: "👧", text: { en: "girl", hi: "लड़की", mr: "मुलगी" }, type: "noun", bgColor: "lightblue" },
                { emoji: "👨", text: { en: "man", hi: "आदमी", mr: "पुरुष" }, type: "noun", bgColor: "lightblue" },
                { emoji: "👩", text: { en: "woman", hi: "औरत", mr: "स्त्री" }, type: "noun", bgColor: "lightblue" },
                { emoji: "🧍", text: { en: "I", hi: "मैं", mr: "मी" }, type: "pronoun", bgColor: "lightyellow" },
                { emoji: "👈", text: { en: "you", hi: "तुम", mr: "तू" }, type: "pronoun", bgColor: "lightyellow" },
                { emoji: "👥", text: { en: "we", hi: "हम", mr: "आम्ही" }, type: "pronoun", bgColor: "lightyellow" },
                { emoji: "👦", text: { en: "he", hi: "वह", mr: "तो" }, type: "pronoun", bgColor: "lightyellow" },
                { emoji: "👧", text: { en: "she", hi: "वह", mr: "ती" }, type: "pronoun", bgColor: "lightyellow" },
                { emoji: "👨‍👩‍👧‍👦", text: { en: "they", hi: "वे", mr: "ते" }, type: "pronoun", bgColor: "lightyellow" },
                { emoji: "🗣️", text: { en: "want", hi: "चाहता हूँ", mr: "हवे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "🏃", text: { en: "go", hi: "जाना", mr: "जाणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "💃", text: { en: "dance", hi: "नाचना", mr: "नाचणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "🎨", text: { en: "draw", hi: "चित्र बनाना", mr: "चित्र काढणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "😴", text: { en: "sleep", hi: "सोना", mr: "झोपणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "😂", text: { en: "laugh", hi: "हँसना", mr: "हसणे" }, type: "verb", bgColor: "lightblue" },
                { emoji: "📍", text: { en: "here", hi: "यहाँ", mr: "इथे" }, type: "adverb", bgColor: "lightyellow" },
                { emoji: "📍", text: { en: "there", hi: "वहाँ", mr: "तिथे" }, type: "adverb", bgColor: "lightyellow" },
                { emoji: "🕒", text: { en: "now", hi: "अब", mr: "आता" }, type: "adverb", bgColor: "lightyellow" }
            ]
        }
    ];

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = languageVoices[language] || "en-US";
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
        speak(sentence);
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

    return (
        <div className="aac-app">
            <div className="language-selector-wrapper">
                <label htmlFor="language" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Choose Language: </label>
                <select id="language" value={language} onChange={handleLanguageChange} style={{ fontSize: '1.2rem', padding: '0.5rem' }}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                </select>
            </div>

            <div className="top-controls">
                <button className="control-btn" onClick={speakSentence}>
                    <div>🔊</div>
                    <div>Speak</div>
                </button>
                <button className="control-btn" onClick={deleteLastWord}>
                    <div>❌</div>
                    <div>Delete</div>
                </button>
                <button className="control-btn" onClick={clearSentence}>
                    <div>🗑️</div>
                    <div>Clear</div>
                </button>
                <button className="control-btn" onClick={handleShareClick}>
                    <div>📤</div>
                    <div>Share</div>
                </button>
            </div>

            <div className="card-grid">
                {categories[0].items.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="card" 
                        style={{ backgroundColor: item.bgColor }}
                        onClick={() => handleCardClick(item.text)}
                    >
                        <div className="card-emoji">{item.emoji}</div>
                        <div className="card-text">{item.text[language]}</div>
                    </div>
                ))}
            </div>

            <div className="sentence-display">
                {sentence}
            </div>
        </div>
    );
}

export default ImageBasedSentenceBuilder;