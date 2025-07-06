import React, { useState } from 'react';
import './VisualSequencingGame.css';

const VisualSequencingGame = () => {
    const [sequence, setSequence] = useState([]);
    const [message, setMessage] = useState('');

    const images = [
        { id: 1, src: process.env.PUBLIC_URL + '/images/wake-up.png', label: 'Wake Up' },
        { id: 2, src: process.env.PUBLIC_URL + '/images/brush.png', label: 'Brush Teeth' },
      
    ];

    const correctSequence = [1, 2, 3, 4];

    const handleImageClick = (id) => {
        if (sequence.length < images.length && !sequence.includes(id)) {
            setSequence([...sequence, id]);
        }
    };

    const checkSequence = () => {
        if (JSON.stringify(sequence) === JSON.stringify(correctSequence)) {
            setMessage('🎉 Great job! You got the correct sequence.');
        } else {
            setMessage('❌ Oops! Try again.');
        }
    };

    const resetGame = () => {
        setSequence([]);
        setMessage('');
    };

    return (
        <div className="sequencing-game">
            <h1>Visual Sequencing Game</h1>
            <p>Arrange images in the correct sequence to tell a story and improve logical thinking.</p>
            <div className="image-options">
                {images.map(image => (
                    <img
                        key={image.id}
                        src={image.src}
                        alt={image.label}
                        onClick={() => handleImageClick(image.id)}
                        className={`game-image ${sequence.includes(image.id) ? 'selected' : ''}`}
                    />
                ))}
            </div>
            <div className="sequence-display">
                <h3>Your Sequence:</h3>
                <div className="sequence-row">
                    {sequence.map(id => {
                        const img = images.find(img => img.id === id);
                        return <img key={id} src={img.src} alt={img.label} className="sequence-image" />;
                    })}
                </div>
            </div>
            <div className="game-controls">
                <button onClick={checkSequence}>Check</button>
                <button onClick={resetGame}>Reset</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default VisualSequencingGame;
