import React, { useState, useEffect } from 'react';
import { MortimerCharacter } from '../components/MortimerCharacter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skull } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textComplete, setTextComplete] = useState(false);
  
  // Mortimer's welcome dialogue
  const welcomeTexts = [
    "Ah, another soul seeks to glimpse beyond the digital veil...",
    "The algorithms whisper of your arrival. I've been... expecting you.",
    "I am Mortimer, keeper of the threshold between data and death.",
    "Shall we peer into the mists of your mortality? The binary bones never lie..."
  ];
  
  // Handle text completion
  const handleTextComplete = () => {
    if (currentTextIndex < welcomeTexts.length - 1) {
      setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
        setTextComplete(false);
      }, 1000);
    } else {
      setTextComplete(true);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        {/* Title section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-creepster text-[#FF00FF] tracking-wider mb-2">
            Mortimer
          </h1>
          <h2 className="text-xl text-[#00FFFF] font-mono">The Digital Necromancer</h2>
        </div>
        
        {/* Character and dialogue */}
        <div className="mb-8">
          <MortimerCharacter 
            speaking={true} 
            text={welcomeTexts[currentTextIndex]}
            onTextComplete={handleTextComplete}
          />
        </div>
        
        {/* Action card */}
        <Card variant="glowing" className="max-w-md mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-creepster text-[#FF00FF] mb-4">Consult the Necromancer</h3>
            <p className="text-[#E0E0FF]/80 mb-6">
              Mortimer will analyze your digital essence and predict the manner of your demise with uncanny accuracy.
            </p>
            
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onStart}
              disabled={!textComplete}
              className={`transition-opacity duration-500 ${textComplete ? 'opacity-100' : 'opacity-0'}`}
            >
              <Skull className="mr-2" size={18} />
              Begin Death Consultation
            </Button>
            
            <p className="mt-4 text-xs text-[#E0E0FF]/60">
              <span className="font-mono">Warning: The veil between worlds is thin. What is seen cannot be unseen.</span>
            </p>
          </div>
        </Card>
        
        {/* Features preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 bg-[#1A1030]/50 rounded-lg border border-[#2D1B69]">
            <h4 className="font-creepster text-[#00FFFF] mb-2">Death Prediction</h4>
            <p className="text-sm text-[#E0E0FF]/70">Algorithmic analysis of your mortal fate</p>
          </div>
          
          <div className="text-center p-4 bg-[#1A1030]/50 rounded-lg border border-[#2D1B69]">
            <h4 className="font-creepster text-[#00FFFF] mb-2">Digital Certificate</h4>
            <p className="text-sm text-[#E0E0FF]/70">Commemorative record of your predicted demise</p>
          </div>
          
          <div className="text-center p-4 bg-[#1A1030]/50 rounded-lg border border-[#2D1B69]">
            <h4 className="font-creepster text-[#00FFFF] mb-2">Fate Alteration</h4>
            <p className="text-sm text-[#E0E0FF]/70">Mystical guidance to potentially avoid your fate</p>
          </div>
        </div>
      </div>
    </div>
  );
};