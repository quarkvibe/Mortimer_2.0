import React, { useEffect, useState } from 'react';

export const DataStreams: React.FC = () => {
  const [streams, setStreams] = useState<Array<{id: number, top: number, left: number, speed: number, chars: string}>>([]);

  // Generate random binary/hex strings
  const generateRandomChars = () => {
    const characters = '01010101010101101010101010101110000001111000000011110ABCDEF';
    let result = '';
    const length = Math.floor(Math.random() * 50) + 20;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
  };

  // Initialize data streams
  useEffect(() => {
    const newStreams = [];
    const streamCount = Math.min(15, Math.floor(window.innerWidth / 100));
    
    for (let i = 0; i < streamCount; i++) {
      newStreams.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        speed: Math.random() * 5 + 1,
        chars: generateRandomChars()
      });
    }
    
    setStreams(newStreams);
    
    // Update streams periodically
    const interval = setInterval(() => {
      setStreams(prevStreams => 
        prevStreams.map(stream => ({
          ...stream,
          chars: Math.random() > 0.8 ? generateRandomChars() : stream.chars
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {streams.map(stream => (
        <div
          key={stream.id}
          className="data-stream"
          style={{
            top: `${stream.top}%`,
            left: `${stream.left}%`,
            animationDuration: `${stream.speed}s`,
            opacity: 0.3 + Math.random() * 0.3
          }}
        >
          {stream.chars}
        </div>
      ))}
    </>
  );
};