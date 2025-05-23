import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundEffects: React.FC = () => {
  const [muted, setMuted] = useState(true);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements
    const ambient = new Audio();
    ambient.src = "https://assets.mixkit.co/sfx/preview/mixkit-cinematic-mystery-background-167.mp3";
    ambient.loop = true;
    ambient.volume = 0.3;
    ambientRef.current = ambient;

    // Set up keyboard click sounds
    const setupKeyboardSounds = () => {
      const handleKeydown = () => {
        if (!muted) {
          const keySound = new Audio();
          keySound.src = "https://assets.mixkit.co/sfx/preview/mixkit-single-key-press-in-a-laptop-2542.mp3";
          keySound.volume = 0.1;
          keySound.play();
        }
      };

      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    };

    const cleanup = setupKeyboardSounds();
    return () => {
      cleanup();
      if (ambientRef.current) {
        ambientRef.current.pause();
      }
    };
  }, [muted]);

  // Toggle mute state
  const toggleMute = () => {
    setMuted(!muted);
    if (muted && ambientRef.current) {
      ambientRef.current.play();
    } else if (!muted && ambientRef.current) {
      ambientRef.current.pause();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={toggleMute}
        className="bg-[#2D1B69] p-2 rounded-full text-[#E0E0FF] hover:bg-[#3D2B75] transition-colors"
        aria-label={muted ? "Enable sound" : "Disable sound"}
      >
        {muted ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};