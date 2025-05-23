import React, { useState, useEffect } from 'react';
import { MortimerCharacter } from '../components/MortimerCharacter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DeathCertificate } from '../components/DeathCertificate';
import { Share2, RotateCcw, Save } from 'lucide-react';

interface ResultsProps {
  predictionData: any;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ predictionData, onReset }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textComplete, setTextComplete] = useState(false);
  
  // Mortimer's results dialogue
  const resultTexts = [
    `Ah, ${predictionData.name}... The algorithm has spoken. I've peered into the void of your future.`,
    `${predictionData.predictionText}`,
    "Would you like to receive your official death certificate? A memento mori for the digital age..."
  ];
  
  // Handle text completion
  const handleTextComplete = () => {
    if (currentTextIndex < resultTexts.length - 1) {
      setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
        setTextComplete(false);
      }, 1000);
    } else {
      setTextComplete(true);
    }
  };
  
  // Mock sharing functionality
  const handleShare = () => {
    alert("Your death prediction has been shared with the Dark Carnival. Your fate echoes through the digital realm.");
  };
  
  // Mock save functionality
  const handleSave = () => {
    alert("Your death certificate has been saved to your Carnival Passport.");
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        {/* Title section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-creepster text-[#FF00FF] tracking-wider mb-2">
            Your Fate Revealed
          </h2>
          <div className="text-[#00FFFF] font-mono">Prediction #{predictionData.id}</div>
        </div>
        
        {/* Character and dialogue */}
        <div className="mb-8">
          <MortimerCharacter 
            speaking={true} 
            text={resultTexts[currentTextIndex]}
            onTextComplete={handleTextComplete}
          />
        </div>
        
        {/* Death certificate */}
        {showCertificate && (
          <div className="mb-8">
            <DeathCertificate predictionData={predictionData} />
          </div>
        )}
        
        {/* Action buttons */}
        <Card variant="default" className="max-w-md mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-creepster text-[#FF00FF] mb-4">Death Prediction Results</h3>
            
            <div className="mb-6">
              <div className="flex flex-col space-y-4">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowCertificate(!showCertificate)}
                  disabled={!textComplete}
                  className={`transition-opacity duration-500 ${textComplete ? 'opacity-100' : 'opacity-0'}`}
                >
                  {showCertificate ? 'Hide Certificate' : 'View Death Certificate'}
                </Button>
                
                {showCertificate && (
                  <>
                    <Button variant="outline" onClick={handleSave}>
                      <Save size={16} className="mr-2" />
                      Save to Carnival Passport
                    </Button>
                    
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 size={16} className="mr-2" />
                      Share Your Fate
                    </Button>
                  </>
                )}
                
                <Button variant="ghost" onClick={onReset}>
                  <RotateCcw size={16} className="mr-2" />
                  Consult Again
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-[#E0E0FF]/70">
              <p>Probability: {predictionData.probability}%</p>
              <p>Estimated Date: {predictionData.deathDate}</p>
            </div>
            
            <div className="mt-4 text-xs text-[#E0E0FF]/60">
              <p className="font-mono">Remember: Your digital essence remains in our database even after your physical form expires.</p>
            </div>
          </div>
        </Card>
        
        {/* Additional features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-[#1A1030]/50 rounded-lg border border-[#2D1B69]">
            <h4 className="font-creepster text-[#00FFFF] mb-2">Fate Alteration Ritual</h4>
            <p className="text-sm text-[#E0E0FF]/70">
              {predictionData.avoidance}
            </p>
          </div>
          
          <div className="p-4 bg-[#1A1030]/50 rounded-lg border border-[#2D1B69]">
            <h4 className="font-creepster text-[#00FFFF] mb-2">Historical Death Pattern</h4>
            <p className="text-sm text-[#E0E0FF]/70">
              {predictionData.historicalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};