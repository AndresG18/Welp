import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GiftChooser.css';
import Confetti from 'react-confetti';
import { FaHeart } from 'react-icons/fa';

const GiftChooser = () => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState('');
  const audioRef = useRef(null);

  const handleSelection = (gift) => {
    setSelection(gift);
    setStep(2); // Move to the celebration animation
  };

  const handleFinalStep = () => {
    setStep(3);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // Ensure the audio replays infinitely
    if (audioRef.current) {
      audioRef.current.loop = true; // Set infinite loop
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1: // Gift selection
        return (
          <motion.div
            className="options"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>What would you like?</h2>
            <div className="button-group">
              <button onClick={() => handleSelection('Dinner Out')}>Dinner Out</button>
              <button onClick={() => handleSelection('Flowers')}>Flowers</button>
              <button onClick={() => handleSelection('Gift')}>A Special Gift</button>
            </div>
          </motion.div>
        );
      case 2: // Celebration with fireworks
        return (
          <motion.div
            className="celebration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Confetti recycle={false} numberOfPieces={300} />
            <motion.h2
              className="celebration-message"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              Yay! You chose {selection}!
            </motion.h2>
            <motion.div
              className="spinny-circle"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎉 🎊 ✨
            </motion.div>
            <button onClick={handleFinalStep} className="next-button">
              See Your Surprise
            </button>
          </motion.div>
        );
      case 3: // Pumping heart animation with the song
        return (
          <motion.div
            className="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div className="image-container">
              <motion.img
                src="https://media1.tenor.com/m/snQMl63UxBEAAAAC/they-dont-love-you-like-i-love-you-dog.gif"
                alt="Heart"
                className="heart-image"
                initial={{ scale: 1.1 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                }}
              />
              <div className="black-overlay top-overlay"></div>
              <div className="black-overlay bottom-overlay"></div>
            </motion.div>
            <motion.h1
              className="love-message"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              I Love You!!
            </motion.h1>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="gift-chooser">
      <audio ref={audioRef} src="https://pinfluence-2024.s3.us-east-2.amazonaws.com/Download.mp3" />
      <h1>Choose Your Gift!</h1>
      {selection && <h2>{selection} it is!</h2>}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
};

export default GiftChooser;