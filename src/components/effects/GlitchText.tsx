import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, intensity = 'low' }) => {
  const [glitchedText, setGlitchedText] = useState(text);
  
  // Characters to use for glitching
  const glitchChars = '01!@#$%^&*()-_=+[]{}|;:,.<>?/';
  
  useEffect(() => {
    // Set initial text
    setGlitchedText(text);
    
    // Determine glitch probability based on intensity
    let glitchProbability;
    let glitchInterval;
    
    switch (intensity) {
      case 'high':
        glitchProbability = 0.1;
        glitchInterval = 150;
        break;
      case 'medium':
        glitchProbability = 0.05;
        glitchInterval = 300;
        break;
      case 'low':
      default:
        glitchProbability = 0.02;
        glitchInterval = 500;
        break;
    }
    
    // Apply random glitches at intervals
    const interval = setInterval(() => {
      if (text.length === 0) return;
      
      // Create a copy of the text to modify
      let newText = text;
      
      // Apply random character replacements
      for (let i = 0; i < text.length; i++) {
        if (Math.random() < glitchProbability) {
          const char = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          newText = newText.substring(0, i) + char + newText.substring(i + 1);
        }
      }
      
      setGlitchedText(newText);
      
      // Reset to original text after a brief delay
      setTimeout(() => {
        setGlitchedText(text);
      }, 50);
      
    }, glitchInterval);
    
    return () => clearInterval(interval);
  }, [text, intensity]);
  
  return <span className="glitch-text">{glitchedText}</span>;
};