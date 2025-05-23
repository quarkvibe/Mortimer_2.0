import React, { useState, useEffect } from 'react';
import { GlitchText } from './effects/GlitchText';

interface MortimerCharacterProps {
  speaking?: boolean;
  text?: string;
  onTextComplete?: () => void;
}

export const MortimerCharacter: React.FC<MortimerCharacterProps> = ({
  speaking = false,
  text = '',
  onTextComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (speaking && text && charIndex < text.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (charIndex >= text.length && isTyping) {
      setIsTyping(false);
      onTextComplete && onTextComplete();
    }
  }, [speaking, text, charIndex, isTyping, onTextComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
  }, [text]);

  // Random eye blink effect
  const [eyeBlink, setEyeBlink] = useState(false);
  
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, Math.random() * 5000 + 3000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative">
      {/* Character portrait */}
      <div className="relative w-full max-w-xs mx-auto">
        <div className="relative animate-float">
          {/* Mortimer's hood and face */}
          <div className="relative bg-[#120B29] rounded-full w-40 h-40 mx-auto overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2D1B69] to-[#120B29]"></div>
            
            {/* Glowing eyes */}
            <div className="absolute top-1/3 left-1/4 w-6 h-3 bg-[#9900FF] rounded-full blur-sm animate-pulse-slow"
                 style={{ opacity: eyeBlink ? 0 : 0.8 }}></div>
            <div className="absolute top-1/3 right-1/4 w-6 h-3 bg-[#9900FF] rounded-full blur-sm animate-pulse-slow"
                 style={{ opacity: eyeBlink ? 0 : 0.8 }}></div>
            
            {/* Robe/hood */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-b from-transparent to-[#120B29]"></div>
          </div>
          
          {/* Robe extending down */}
          <div className="relative h-20 w-48 mx-auto -mt-5 bg-gradient-to-b from-[#120B29] to-transparent">
            <div className="absolute -bottom-5 left-0 right-0 h-20 bg-gradient-to-b from-[#120B29] to-transparent 
                           blur-md opacity-50"></div>
          </div>
        </div>
        
        {/* Digital glitches and effects */}
        <div className="absolute -inset-4">
          <div className="absolute top-1/4 left-0 w-full h-2 bg-[#00FFFF] opacity-20 blur-sm"></div>
          <div className="absolute bottom-1/3 right-0 w-full h-2 bg-[#FF00FF] opacity-20 blur-sm"></div>
        </div>
      </div>
      
      {/* Dialogue box */}
      {speaking && (
        <div className="mt-6 bg-[#120B29]/90 border border-[#2D1B69] rounded-lg p-5 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rotate-45 bg-[#120B29] border-t border-l border-[#2D1B69]"></div>
          
          <div className="font-mono text-[#E0E0FF] relative">
            <GlitchText text={displayedText} />
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>
      )}
    </div>
  );
};